import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import Bull, { CronRepeatOptions, Queue } from 'bull';
import { CONSUMERS, CRON_TIME, PING_QUEUE } from './constants';
import { searchRepeatable } from 'src/utils/queueHelpers';

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
    const jobs = await this.transcodeQueue.getRepeatableJobs();
    const keys = (await this.transcodeQueue.getJob(id)).opts.repeat as {
      count: number;
      key: string;
      cron: string;
    };
    const jobIndex = searchRepeatable(jobs, id);
    console.log('indice', keys, jobs, jobIndex);

    return await this.transcodeQueue.removeRepeatableByKey(keys.key);
  }
}
