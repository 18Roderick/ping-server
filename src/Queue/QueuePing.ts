import { Cause, Context, Effect, Layer, Runtime } from 'effect';
import { Queue, Worker, type Job } from 'bullmq';
import { eq } from 'drizzle-orm';

import { RedisConnection } from '@/Queue/Connection';
import { Db, type Database } from '@/Db/Db';
import { logs, pings, servers, tasks } from '@/Db/schemas';
import { makePing } from '@/Ping/ping';

export const QUEUE_PING_NAME = '{QUEUE_PING}';

export enum CRON_TIME {
  EVERY_MINUTE = '* * * * *',
  EVERY_FIVE_MINUTES = '*/5 * * * *',
}

export enum CONSUMERS {
  PING_SERVER = '#PING_SERVER',
}

export interface AddPingTask {
  readonly idServer: string;
  readonly idUser: string;
}

export class QueuePingService extends Context.Tag('QueuePingService')<
  QueuePingService,
  {
    readonly createPingTask: (data: AddPingTask) => Effect.Effect<string>;
    readonly getJobSchedulerByServerId: (idServer: string) => Effect.Effect<unknown>;
    readonly getJobSchedulers: () => Effect.Effect<unknown>;
    readonly removeJobScheduler: (idServer: string) => Effect.Effect<boolean>;
    readonly resumeStaledPings: () => Effect.Effect<void>;
    readonly pauseStaledPings: () => Effect.Effect<void>;
  }
>() {}

const runPingJob = (db: Database, job: Job<AddPingTask>) =>
  Effect.gen(function* () {
    const server = yield* Effect.promise(() =>
      db
        .select({
          id_user: servers.id_user,
          id_server: servers.id_server,
          url: servers.url,
          ip: servers.ip,
          id_task: tasks.id_task,
          retries_failed: tasks.retries_failed,
        })
        .from(servers)
        .leftJoin(tasks, eq(servers.id_server, tasks.id_server))
        .where(eq(servers.id_server, job.data.idServer)),
    );

    const row = server[0];
    if (!row) {
      return yield* Effect.fail(new Error(`SERVER NOT FOUND: ${job.data.idServer}`));
    }

    const destination = row.url ? new URL(row.url).host : (row.ip as string);
    const pingResult = yield* makePing(destination).pipe(Effect.either);

    if (pingResult._tag === 'Right') {
      const data = pingResult.right;

      if (!row.ip) {
        yield* Effect.promise(() =>
          db
            .update(servers)
            .set({ ip: data.numeric_host })
            .where(eq(servers.id_server, row.id_server)),
        );
      }

      yield* Effect.promise(() =>
        db.insert(pings).values({
          id_server: row.id_server,
          times: data.times.length,
          packet_loss: data.packetLoss,
          min: data.min,
          max: data.max,
          avg: data.avg,
          log: `Server is ${data.alive ? 'alive' : 'dead'}`,
          is_alive: data.alive ? 1 : 0,
          numeric_host: data.numeric_host ?? destination,
        }),
      );
      return;
    }

    const task = yield* Effect.promise(() =>
      db.query.tasks.findFirst({ where: eq(servers.id_server, row.id_server) }),
    );

    if (task && task.retries_failed <= 3) {
      yield* Effect.promise(() =>
        db
          .update(tasks)
          .set({ retries_failed: task.retries_failed + 1 })
          .where(eq(tasks.id_task, task.id_task)),
      );
    }

    // fails the job so BullMQ's retry/backoff actually engages, instead of
    // silently swallowing the failure and marking the job "completed"
    return yield* Effect.fail(new Error(pingResult.left.message));
  }).pipe(
    Effect.tapErrorCause((cause) =>
      Effect.promise(() =>
        db.insert(logs).values({
          description: Cause.pretty(cause).slice(0, 5000),
          error_level: 'critical',
          action: CONSUMERS.PING_SERVER,
        }),
      ),
    ),
  );

export const QueuePingServiceLive = Layer.scoped(
  QueuePingService,
  Effect.gen(function* () {
    const connection = yield* RedisConnection;
    const db = yield* Db;
    const runtime = yield* Effect.runtime<never>();

    const queue = new Queue<AddPingTask>(QUEUE_PING_NAME, {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5_000 },
      },
    });

    const worker = new Worker<AddPingTask>(
      QUEUE_PING_NAME,
      (job) => Runtime.runPromise(runtime)(runPingJob(db, job)),
      { connection },
    );

    yield* Effect.addFinalizer(() =>
      Effect.promise(async () => {
        await worker.close();
        await queue.close();
      }),
    );

    return {
      createPingTask: (data) =>
        Effect.promise(async () => {
          const job = await queue.upsertJobScheduler(
            data.idServer,
            { pattern: CRON_TIME.EVERY_MINUTE },
            { name: CONSUMERS.PING_SERVER, data },
          );
          return job.id as string;
        }),

      getJobSchedulerByServerId: (idServer) =>
        Effect.promise(() => queue.getJobSchedulers()).pipe(
          Effect.map((schedulers) => schedulers.find((s) => s.id === idServer)),
        ),

      getJobSchedulers: () => Effect.promise(() => queue.getJobSchedulers()),

      removeJobScheduler: (idServer) => Effect.promise(() => queue.removeJobScheduler(idServer)),

      resumeStaledPings: () => Effect.promise(() => queue.resume()),

      pauseStaledPings: () => Effect.promise(() => queue.pause()),
    };
  }),
);
