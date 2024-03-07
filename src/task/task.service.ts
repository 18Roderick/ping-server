import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CONSUMERS, CRON_TIME, PING_QUEUE } from './constants';

@Injectable()
export class TaskService {
  constructor(@InjectQueue(PING_QUEUE) private readonly transcodeQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async transcode() {
    await this.transcodeQueue.add({
      fileName: './file.mp3',
    });
  }

  async serverPing(id: string) {
    /**
     * before add the ping, the server should be validate that exists
     */
    console.log(id);
    const job = await this.transcodeQueue.add(
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
    return this.transcodeQueue.getJob(id);
  }
  async deleteJob(id: string) {
    console.log('removing job ', id);
    const job = await this.transcodeQueue.getJob(id);
    const keys = job.opts.repeat as {
      count: number;
      key: string;
      cron: string;
    };

    return await this.transcodeQueue.removeRepeatableByKey(keys.key);
  }
}
