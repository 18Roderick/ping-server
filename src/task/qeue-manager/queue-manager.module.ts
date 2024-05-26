import { Global, Module } from '@nestjs/common';
import { QueueManagerService } from './queue-manager.service';
import { QueueManagerProcessor } from './queue-manager.processor';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_MANAGER_NAME } from './queue-manager.enums';
import { BullMqProviderQeue } from '@/providers/qeue-provider';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: QUEUE_MANAGER_NAME,
      useFactory: BullMqProviderQeue({ prefix: QUEUE_MANAGER_NAME }),
      inject: [ConfigService],
    }),
  ],
  providers: [QueueManagerService, QueueManagerProcessor],
  exports: [QueueManagerService, QueueManagerProcessor],
})
export class QeueManagerModule {}
