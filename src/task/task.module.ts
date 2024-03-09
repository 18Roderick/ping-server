import { Global, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PING_QUEUE } from './constants';
import { BullModule } from '@nestjs/bull';
import { TaskConsumer } from './task.consumer';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: PING_QUEUE,
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskConsumer],
  exports: [TaskService],
})
export class TaskModule {}
