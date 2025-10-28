import { Global, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PING_PRODUCER, PING_QUEUE } from './constants';
import { BullModule } from '@nestjs/bullmq';
import { TaskConsumer } from './task.consumer';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/config/config';
import { BullMqProviderQeue } from '@/providers/qeue-provider';
import { QeueManagerModule, QueueManagerService } from './qeue-manager';
import { QUEUE_MANAGER_NAME } from './qeue-manager/queue-manager.enums';

@Global()
@Module({
  imports: [
    BullModule.registerFlowProducerAsync({
      name: PING_PRODUCER,
      useFactory: BullMqProviderQeue({ prefix: '{#JOBPRODUCER}' }),
      inject: [ConfigService],
    }),
    BullModule.registerQueueAsync({
      name: QUEUE_MANAGER_NAME,
      useFactory: BullMqProviderQeue({ prefix: QUEUE_MANAGER_NAME }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskConsumer],
  exports: [TaskService],
})
export class TaskModule {}
