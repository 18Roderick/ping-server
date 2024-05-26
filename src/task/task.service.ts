import { Inject, Injectable } from '@nestjs/common';
import { FlowProducer, Queue } from 'bullmq';
import { CONSUMERS, CRON_TIME, PING_PRODUCER, PING_QUEUE } from './constants';
import { AddPingTask } from './dtos/task.dto';
import { DB } from '@/db';
import { InjectQueue, InjectFlowProducer } from '@nestjs/bullmq';
import cronParser from 'cron-parser';
import { InjectQueueManager, QueueManagerService } from './qeue-manager';

@Injectable()
export class TaskService {
  constructor(
    // @InjectFlowProducer(PING_PRODUCER) private flowProducer: FlowProducer,
    @InjectQueueManager() private readonly taskQueue: Queue,
    private readonly _queueManagerService: QueueManagerService,
    @Inject('DB') private readonly db: DB,
  ) {}

  getTasks() {
    return this.taskQueue.getRepeatableJobs();
  }

  async transcode() {
    //return this.taskQueue.add('demo', { foo: 'bar' });
    return this._queueManagerService.AddServerPing({
      idUser: 'wssoim3j98983js',
      idServer: 'siossnois',
    });
  }

  async addPingServerTask(taskDto: AddPingTask) {
    return this._queueManagerService.AddServerPing(taskDto);
  }

  async serverPing(id: string) {
    /**
     * before add the ping, the server should be validate that exists
     */
    const job = await this.taskQueue.add(
      CONSUMERS.PING_SERVER,
      {
        id: id,
      },
      {
        repeat: {
          pattern: CRON_TIME.EVERY_FIVE_MINUTES,
        },
      },
    );
    return job;
  }

  async getServerTask(id: string) {
    return this.taskQueue.getJob(id);
  }
  async deleteJob(id: string) {
    console.log('removing job ', id);
    const job = await this.taskQueue.getJob(id);
    const keys = job.opts.repeat as {
      count: number;
      key: string;
      cron: string;
    };

    return await this.taskQueue.removeRepeatableByKey(keys.key);
  }
}
