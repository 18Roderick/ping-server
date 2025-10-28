import { InjectQueue, Processor, InjectFlowProducer, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { FlowProducer, Job, Queue } from 'bullmq';
import { CONSUMERS, CRON_TIME, PING_PRODUCER, PING_QUEUE } from './constants';
import { AddPingTask } from './dtos/task.dto';
import { makePing } from '@/utils/ping/ping';
import { randomUUID } from 'crypto';
import { TaskService } from './task.service';
import { eq } from 'drizzle-orm';
import { logs, pings, servers, tasks } from '@/db/schemas';
import { DB } from '@/db';

@Processor(PING_QUEUE)
export class TaskConsumer extends WorkerHost {
  private readonly logger = new Logger(TaskConsumer.name);

  constructor(
    // @InjectFlowProducer(PING_PRODUCER) private taskQueue: FlowProducer,
    @Inject('DB') private readonly db: DB,
    private readonly taskService: TaskService,
  ) {
    super();
  }

  process(job: Job<AddPingTask>, token?: string) {
    console.log('Procesando ', job.data, token);

    return null;
  }
}
/**
 @Processor(CONSUMERS.PING_SERVER)
  async serverPing(job: Job<AddPingTask>) {
    try {
      this.logger.debug('STARTING PING');
      const server = await this.db
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
        .where(eq(servers.id_server, job.data.idServer));

      if (server.length < 1) {
        //remover tarea en caso de que el servidor ya no exista
        this.logger.error('SERVER NOT FOUND', job.data.idServer);
        this.taskService.deleteJob(String(job.id));
        return job.moveToFailed({ message: 'SERVER NOT FOUND' });
      }
      this.logger.debug('SERVER: ' + server[0].url, server[0].ip);

      let destination: string;

      if (server.length > 0 && server[0].url) {
        destination = new URL(server[0].url).host;
      } else {
        destination = server[0].ip;
      }

      this.logger.log(`=>>>  destination ping:  ${destination}`);
      const pingData = await makePing(destination);

      if (pingData.success) {
        //update ip server address if it doesnt have one
        if (!server[0].ip) {
          this.logger.log(`update ip server`);
          await this.db
            .update(servers)
            .set({
              ip: pingData.data.numeric_host,
            })
            .where(eq(servers.id_server, server[0].id_server));
        }

        const log = `Server is ${pingData.data.alive ? 'alive' : 'dead'}`;
        const isAlive = pingData.data.alive ? 1 : 0;

        await this.db.insert(pings).values({
          id_server: server[0].id_server,
          times: pingData.data.times.length,
          packet_loss: pingData.data.packetLoss,
          min: pingData.data.min,
          max: pingData.data.max,
          avg: pingData.data.avg,
          log: log,
          is_alive: isAlive,
          numeric_host: pingData.data.numeric_host,
        });

        this.logger.log('adding ping to table');
      } else {
        this.logger.warn('PING DATA FAILED ', pingData);
        const task = await this.db.query.tasks.findFirst({
          where: eq(servers.id_server, server[0].id_server),
        });

        //update task to aument the counter retries
        if (task) {
          //demasiados intentos eliminar o supender tareas

          if (task.retries_failed > 3) {
          } else {
            //aumentar contador de tarea fallida
            await this.db
              .update(tasks)
              .set({
                retries_failed: task.retries_failed + 1,
              })
              .where(eq(tasks.id_task, task.id_task));
          }
        }
      }

      this.logger.debug('END PING');
    } catch (err: unknown) {
      this.logger.fatal(err);
      //this should be change for a event, so it doesnt block the main thread
      await this.db.insert(logs).values({
        description: err instanceof Error ? err.message : 'Error inserting',
        error_level: 'critical',
        action: CONSUMERS.PING_SERVER,
      });
    }
  }

  @Process(CONSUMERS.ADD_PING_TASK)
  async addTask(job: Job<AddPingTask>) {
    this.logger.log('CREANDO TAREA DE PINGS ', job.data.idServer);

    const server = await this.db.query.servers.findFirst({
      where: eq(servers.id_server, job.data.idServer),
    });

    if (!server) {
      this.logger.error(CONSUMERS.ADD_PING_TASK + 'SERVER NOT FOUND', job.data.idServer);
      return await job.moveToFailed({ message: 'SERVER NOT FOUND' });
    }

    const jobTask = await this.taskQueue.add(
      CONSUMERS.PING_SERVER,
      {
        idServer: server.id_server,
        idUser: server.id_user,
      },
      {
        repeat: {
          cron: CRON_TIME.EVERY_MINUTE,
        },
        lifo: true,
        jobId: randomUUID(),
      },
    );

    try {
      const created = await this.db.insert(tasks).values({
        id_job: jobTask.id as string,
        cron: CRON_TIME.EVERY_MINUTE,
        type: 'server',
        log: 'NO ISSUES',
        id_server: server.id_server,
      });
    } catch (error) {
      // console.log('ERROR IN CREATING TASK ', error);
    }

    this.logger.debug('PING TASK ADDED', job.id);
  }
 */
