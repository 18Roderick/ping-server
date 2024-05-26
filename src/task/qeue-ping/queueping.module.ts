import { Module, Global } from '@nestjs/common';
import { QUEUE_PING_NAME } from './queueping.enums';
import { BullMqProviderQeue } from '@/providers/qeue-provider';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { QueuePingService } from './queueping.service';
import { QueuePingProcessor } from './queueping.processor';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: QUEUE_PING_NAME,
      useFactory: BullMqProviderQeue({ prefix: QUEUE_PING_NAME }),
      inject: [ConfigService],
    }),
  ],
  providers: [QueuePingService, QueuePingProcessor],
  exports: [QueuePingService, QueuePingProcessor],
})
export class QueuePingModule {}
