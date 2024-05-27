import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { randomUUID } from 'node:crypto';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get('demo')
  demo() {
    console.log('demo');
    return this.taskService.transcode();
  }

  @Get(':id')
  getTaskByKey(@Param('id') id: string) {
    return this.taskService.getRepeatableTasks(id);
  }

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get('interval')
  taskInterval() {
    return this.taskService.serverPing(randomUUID());
  }

  @Get('search/:jobId')
  getTask(@Param('jobId') jobId: string) {
    console.log(jobId);
    return this.taskService.getServerTask(jobId);
  }

  @Delete('remove/:jobId')
  removeTaskJob(@Param('jobId') jobId: string) {
    return this.taskService.deleteJob(jobId);
  }
}
