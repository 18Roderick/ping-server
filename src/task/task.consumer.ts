import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { CONSUMERS, CRON_TIME, PING_QUEUE } from './constants';
import { AddPingTask } from './dtos/task.dto';
import { makePing } from '@/utils/ping/ping';
import { ErrorLevel, TASKTYPES } from '@prisma/client';
import { randomUUID } from 'crypto';
import { TaskService } from './task.service';
import { DrizzleDb } from '@/db';

@Processor(PING_QUEUE)
export class TaskConsumer {
  private readonly logger = new Logger(TaskConsumer.name);

  constructor(
    @InjectQueue(PING_QUEUE) private readonly taskQueue: Queue,
    @Inject("db") private readonly db: DrizzleDb,
    private readonly taskService: TaskService,
  ) {}

  @Process(CONSUMERS.PING_SERVER)
  async serverPing(job: Job<AddPingTask>) {
    try {
      this.logger.debug('STARTING PING');
      const server = await this.prismaService.servers.findFirst({
        where: {
          idServer: job.data.idServer,
          AND: [{ idUser: job.data.idUser }],
        },
        include: {
          Tasks: {
            take: 1,
          },
        },
      });

      if (!server) {
        //remover tarea en caso de que el servidor ya no exista
        this.logger.error('SERVER NOT FOUND', job.data.idServer);
        this.taskService.deleteJob(String(job.id));
        return job.moveToFailed({ message: 'SERVER NOT FOUND' });
      }
      this.logger.debug('SERVER: ' + server.url, server.ip);

      let destination: string;

      if (server.url) {
        destination = new URL(server.url).host;
      } else {
        destination = server.ip;
      }

      this.logger.log(`=>>>  destination ping:  ${destination}`);
      const pingData = await makePing(destination);

      if (pingData.success) {
        //update ip server address if it doesnt have one
        if (!server.ip) {
          this.logger.log(`update ip server`);
          await this.prismaService.servers.update({
            data: {
              ip: pingData.data.numeric_host,
            },
            where: {
              idServer: server.idServer,
              AND: [{ idUser: server.idUser }],
            },
          });
        }

        const log = `Server is ${pingData.data.alive ? 'alive' : 'dead'}`;

        await this.prismaService.pings.create({
          data: {
            serversIdServer: server.idServer,
            times: pingData.data.times.length,
            packetLoss: pingData.data.packetLoss,
            min: pingData.data.min,
            max: pingData.data.max,
            avg: pingData.data.avg,
            log: log,
            isAlive: pingData.data.alive,
            numericHost: pingData.data.numeric_host,
          },
        });
        this.logger.log('adding ping to table');
      } else {
        this.logger.warn('PING DATA FAILED ', pingData);
        const [task] = server.Tasks;
        //update task to aument the counter retries
        if (task) {
          //demasiados intentos eliminar o supender tareas

          if (task.retriesFailed > 3) {
          } else {
            //aumentar contador de tarea fallida
            await this.prismaService.tasks.update({
              data: {
                retriesFailed: task.retriesFailed + 1,
              },
              where: {
                serversIdServer: server.idServer,
                idTask: task.idTask,
              },
            });
          }
        }
      }

      this.logger.debug('END PING');
    } catch (err: unknown) {
      this.logger.fatal(err);
      if (err instanceof Error) {
        this.prismaService.logs.create({
          data: {
            description: err.message,
            errorLevel: ErrorLevel.CRITICAL,
            action: CONSUMERS.PING_SERVER,
          },
        });
      }
    }
  }

  @Process(CONSUMERS.ADD_PING_TASK)
  async addTask(job: Job<AddPingTask>) {
    this.logger.log('CREANDO TAREA DE PINGS ', job.data.idServer);

    const server = await this.prismaService.servers.findFirst({
      where: {
        idServer: job.data.idServer,
        AND: [{ idUser: job.data.idUser }],
      },
    });

    if (!server) {
      this.logger.error('SERVER NOT FOUND', job.data.idServer);
      return job.moveToFailed({ message: 'SERVER NOT FOUND' });
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

    await this.prismaService.tasks.create({
      data: {
        idJob: jobTask.id as string,
        cron: CRON_TIME.EVERY_MINUTE,
        type: TASKTYPES.SERVER,
        log: 'NO ISSUES',
        serversIdServer: server.idServer,
      },
    });

    this.logger.debug('PING TASK ADDED', job.id);
  }
}
