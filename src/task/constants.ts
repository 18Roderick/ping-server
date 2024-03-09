export const PING_QUEUE = 'PING_QUEUE';

export enum CRON_TIME {
  EVERY_MINUTE = '* * * * *',
  EVERY_FIVE_MINUTES = '*/5 * * * *',
  EVERY_THIRTY_MINUTES = '*/30 * * * *',
  EVERY_HOUR = '0 * * * *',
}

export enum CONSUMERS {
  PING_SERVER = 'PING_SERVER',
  ADD_PING_TASK = 'ADD_PING_TASK',
}
