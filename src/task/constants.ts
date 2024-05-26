export const PING_QUEUE = '#PING_QUEUE';
export const PING_PRODUCER = '#PING_PRODUCER';
export const PING_CONSUMER = '#PING_CONSUMER';

export const PING_SERVER_QUEUE = '#PING_SERVER_QUEUE';
export const PING_SERVER_PRODUCER = '#PING_SERVER_PRODUCER';
export const PING_SERVER_CONSUMER = '#PING_SERVER_CONSUMER';



export enum CRON_TIME {
  EVERY_MINUTE = '* * * * *',
  EVERY_FIVE_MINUTES = '*/5 * * * *',
  EVERY_THIRTY_MINUTES = '*/30 * * * *',
  EVERY_HOUR = '0 * * * *',
}

export enum CONSUMERS {
  PING_SERVER = '#PING_SERVER',
  ADD_PING_TASK = '#ADD_PING_TASK',
}
