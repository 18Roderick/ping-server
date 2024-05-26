import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QUEUE_PING_NAME } from './queueping.enums';
import { Job, Queue } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { AddPingTask } from '../dtos/task.dto';
import { DB } from '@/db';
import { logs, pings, servers, tasks } from '@/db/schemas';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { CONSUMERS, CRON_TIME } from '../constants';
import { InjectDatabase } from '@/db/decorator.provider';
import { InjectQueuePing } from './queueping.decorator';
import { makePing } from '@/utils/ping/ping';

@Processor(QUEUE_PING_NAME)
export class QueuePingProcessor extends WorkerHost {
  private readonly logger = new Logger(QueuePingProcessor.name);

  constructor(
    @InjectDatabase() private readonly db: DB,
    @InjectQueuePing() private readonly taskService: Queue,
  ) {
    super();
  }

  async process(job: Job<AddPingTask>, token?: string) {
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
        this.taskService.remove(String(job.id));
        return job.moveToFailed(new Error('SERVER NOT FOUND'), token);
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
}
