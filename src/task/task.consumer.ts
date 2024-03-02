import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CONSUMERS, PING_QUEUE } from './constants';

@Processor(PING_QUEUE)
export class TaskConsumer {
  private readonly logger = new Logger(TaskConsumer.name);

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log(`Transcoding message: ${job.id}`);
    this.logger.debug('Data:', job.data);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 8000));
    this.logger.log(`Transcoding complete for job: ${job.id}`);
  }

  @Process(CONSUMERS.PING_SERVER)
  async serverPing(job: Job<unknown>) {
    console.log('repeated job ', job.id);
  }
}
