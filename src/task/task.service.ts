import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CONSUMERS, CRON_TIME, PING_QUEUE } from './constants';
import { AddPingTask } from './dtos/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectQueue(PING_QUEUE) private readonly taskQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async transcode() {
    await this.taskQueue.add({
      fileName: './file.mp3',
    });
  }

  async addPingServerTask(taskDto: AddPingTask) {
    return this.taskQueue.add(CONSUMERS.ADD_PING_TASK, taskDto, {
      removeOnComplete: true,
    });
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
          cron: CRON_TIME.EVERY_FIVE_MINUTES,
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
