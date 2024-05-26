import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QUEUE_MANAGER_NAME } from './queue-manager.enums';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { AddPingTask } from '../dtos/task.dto';
import { DB } from '@/db';
import { servers, tasks } from '@/db/schemas';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { CONSUMERS, CRON_TIME } from '../constants';
import { QueuePingService } from '../qeue-ping/queueping.service';
import { InjectDatabase } from '@/db/decorator.provider';

@Processor(QUEUE_MANAGER_NAME)
export class QueueManagerProcessor extends WorkerHost {
  private readonly logger = new Logger(QueueManagerProcessor.name);

  constructor(
    @InjectDatabase() private readonly db: DB,
    private readonly _queuePingService: QueuePingService,
  ) {
    super();
  }

  async process(job: Job<AddPingTask>, token?: string) {
    this.logger.log('CREANDO TAREA DE PINGS ', job.data.idServer);

    const server = await this.db.query.servers.findFirst({
      where: eq(servers.id_server, job.data.idServer),
    });

    if (!server) {
      this.logger.error(CONSUMERS.ADD_PING_TASK + 'SERVER NOT FOUND', job.data.idServer);
      await job.moveToFailed(new Error('SERVER NOT FOUND'), token);
    }

    const jobTask = await this._queuePingService.createPingTask({
      idServer: server.id_server,
      idUser: server.id_user,
    });

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
}
