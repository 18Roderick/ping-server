import { InjectQueue } from '@nestjs/bullmq';
import { QUEUE_PING_NAME } from './queueping.enums';

export const InjectQueuePing = () => InjectQueue(QUEUE_PING_NAME);
