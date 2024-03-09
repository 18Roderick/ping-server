import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { CONSUMERS, CRON_TIME, PING_QUEUE } from './constants';
import { AddPingTask } from './dtos/task.dto';
import { PrismaService } from '@/services/prisma.service';
import { makePing } from '@/utils/ping/ping';
import { TASKTYPES } from '@prisma/client';

@Processor(PING_QUEUE)
export class TaskConsumer {
  private readonly logger = new Logger(TaskConsumer.name);

  constructor(
    @InjectQueue(PING_QUEUE) private readonly taskQueue: Queue,
    private readonly prismaService: PrismaService,
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
      });

      if (!server) {
        this.logger.error('SERVER NOT FOUND', job.data.idServer);
        return job.moveToFailed({ message: 'SERVER NOT FOUND' });
      }

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
      }

      this.logger.debug('END PING');
    } catch (err) {
      this.logger.fatal(err);
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
