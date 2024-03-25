import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { CONSUMERS, CRON_TIME, PING_QUEUE } from './constants';
import { AddPingTask } from './dtos/task.dto';
import { makePing } from '@/utils/ping/ping';
import { randomUUID } from 'crypto';
import { TaskService } from './task.service';
import { DrizzleDb } from '@/db';
import { and, eq } from 'drizzle-orm';
import { logs, pings, servers, tasks } from '@/db/schemas';

@Processor(PING_QUEUE)
export class TaskConsumer {
  private readonly logger = new Logger(TaskConsumer.name);

  constructor(
    @InjectQueue(PING_QUEUE) private readonly taskQueue: Queue,
    @Inject('DB') private readonly db: DrizzleDb,
    private readonly taskService: TaskService,
  ) {}

  @Process(CONSUMERS.PING_SERVER)
  async serverPing(job: Job<AddPingTask>) {
    try {
      this.logger.debug('STARTING PING');
      const server = await this.db
        .select({
          idUser: servers.idUser,
          idServer: servers.idServer,
          url: servers.url,
          ip: servers.ip,
          idTask: tasks.idTask,
          retriesFailed: tasks.retriesFailed,
        })
        .from(servers)
        .leftJoin(tasks, eq(servers.idServer, tasks.idServer))
        .where(eq(servers.idServer, job.data.idServer));

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
            .where(eq(servers.idServer, server[0].idServer));
        }

        const log = `Server is ${pingData.data.alive ? 'alive' : 'dead'}`;
        const isAlive = pingData.data.alive ? 1 : 0;

        await this.db.insert(pings).values({
          idServer: server[0].idServer,
          times: pingData.data.times.length,
          packetLoss: pingData.data.packetLoss,
          min: pingData.data.min,
          max: pingData.data.max,
          avg: pingData.data.avg,
          log: log,
          isAlive: isAlive,
          numericHost: pingData.data.numeric_host,
        });

        this.logger.log('adding ping to table');
      } else {
        this.logger.warn('PING DATA FAILED ', pingData);
        const task = await this.db.query.tasks.findFirst({
          where: eq(servers.idServer, server[0].idServer),
        });

        //update task to aument the counter retries
        if (task) {
          //demasiados intentos eliminar o supender tareas

          if (task.retriesFailed > 3) {
          } else {
            //aumentar contador de tarea fallida
            await this.db
              .update(tasks)
              .set({
                retriesFailed: task.retriesFailed + 1,
              })
              .where(eq(tasks.idTask, task.idTask));
          }
        }
      }

      this.logger.debug('END PING');
    } catch (err: unknown) {
      this.logger.fatal(err);
      //this should be change for a event, so it doesnt block the main thread
      await this.db.insert(logs).values({
        description: err instanceof Error ? err.message : 'Error inserting',
        errorLevel: 'CRITICAL',
        action: CONSUMERS.PING_SERVER,
      });
    }
  }

  @Process(CONSUMERS.ADD_PING_TASK)
  async addTask(job: Job<AddPingTask>) {
    this.logger.log('CREANDO TAREA DE PINGS ', job.data.idServer);

    const server = await this.db.query.servers.findFirst({
      where: eq(servers.idServer, job.data.idServer),
    });

    if (!server) {
      this.logger.error(CONSUMERS.ADD_PING_TASK + 'SERVER NOT FOUND', job.data.idServer);
      return await job.moveToFailed({ message: 'SERVER NOT FOUND' });
    }

    const jobTask = await this.taskQueue.add(
      CONSUMERS.PING_SERVER,
      {
        idServer: server.idServer,
        idUser: server.idUser,
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
        idJob: jobTask.id as string,
        cron: CRON_TIME.EVERY_MINUTE,
        type: 'SERVER',
        log: 'NO ISSUES',
        idServer: server.idServer,
      });
    } catch (error) {
      // console.log('ERROR IN CREATING TASK ', error);
    }

    this.logger.debug('PING TASK ADDED', job.id);
  }
}
