import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueuePing } from './queueping.decorator';
import { randomUUID } from 'crypto';
import { CONSUMERS, CRON_TIME } from '../constants';

@Injectable()
export class QueuePingService {
  constructor(@InjectQueuePing() private readonly queue: Queue) {}

  createPingTask(data: any) {
    return this.queue.add(CONSUMERS.PING_SERVER, data, {
      repeat: {
        pattern: CRON_TIME.EVERY_MINUTE,
      },
      lifo: true,
      jobId: randomUUID(),
    });
  }

  async getRepeatableBykey(key: string) {
    console.log('Buscando ', key, await this.queue.getRepeatableJobs());
    return (await this.queue.getRepeatableJobs()).find((job) => job.key === key);
  }

  getRepeatableTasks() {
    return this.queue.getRepeatableJobs();
  }

  resumeStaledPings() {
    return this.queue.resume();
  }

  pauseStaledPings() {
    return this.queue.pause();
  }
}
