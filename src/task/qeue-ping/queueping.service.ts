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
}
