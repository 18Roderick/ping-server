import { Injectable } from '@nestjs/common';
import { InjectQueueManager } from './inject-queue.decorator';
import { Queue } from 'bullmq';
import { QUEUE_MANAGER_ACTIONS } from './queue-manager.enums';

@Injectable()
export class QueueManagerService {
  constructor(@InjectQueueManager() private readonly _queueManager: Queue) {}

  async AddServerPing(addDto: { idUser: string; idServer: string }) {
    console.log('AddServerPing', addDto);
    return this._queueManager.add(QUEUE_MANAGER_ACTIONS.ADD_PING_TASK, addDto);
  }
}
