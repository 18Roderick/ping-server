import { InjectQueue } from '@nestjs/bullmq';
import { QUEUE_MANAGER_NAME } from './queue-manager.enums';

export const InjectQueueManager = () => InjectQueue(QUEUE_MANAGER_NAME);
