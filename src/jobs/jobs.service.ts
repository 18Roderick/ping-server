import { DrizzleDb } from '@/db';
import { PingInsert, logs, servers } from '@/db/schemas';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { and, avg, count, eq, gte, lte, max, min, sql } from 'drizzle-orm';
import { pings } from '@/db/schemas';
import { DateTime } from 'luxon';
import { dailySummary } from '@/db/sql';
import { PROCCESS, SummaryPingByRange } from '@/utils/jobs/sumarize-pings';

/**
 * @description background jobs
 */
@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(@Inject('DB') private readonly db: DrizzleDb) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async hourlyProcess() {
    try {
      console.log('initializating process \n');
      /**
       * objective of the proceess
       * summarize the data of the pings, every hour, every day.
       * at the it should only contain 1 ping by HOUR and 1 ping by hour at the current day
       * steps:
       */
      const date = DateTime.now().startOf('hour');

      const startHour = date.startOf('hour');
      const endHour = date.minus({ hour: 1 }).endOf('hour');

      console.log('beggining of date hour', startHour.toJSDate());
      console.log('end of date hour', endHour.toJSDate());
      //1. it should collect the avg, min and max of the pings of every server

      this.db.transaction((ctx) => SummaryPingByRange(ctx, startHour, endHour));
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'error sumarry';
      console.log('LONNGGGG ', msg.length, msg);
      await this.db.insert(logs).values({
        description: msg,
        action: PROCCESS.HOURLY_PROCESS,
        affectedEntity: 'PINGS',
      });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async dailyProcess(){

    try {
      console.log('initializating process daily \n');
      /**
       * objective of the proceess
       * summarize the data of the pings, every hour, every day.
       * at the it should only contain 1 ping by day and 1 ping by hour at the current day
       * steps:
       */
      const date = DateTime.now()

      const startDay = date.minus({hour:5}).startOf('day'); //day before beginning
      const endDay = startDay.endOf('day'); //end of the day

      console.log('beggining of date hour', startDay.toJSDate());
      console.log('end of date hour', endDay.toJSDate());
      //1. it should collect the avg, min and max of the pings of every server

      this.db.transaction((ctx) => SummaryPingByRange(ctx, startDay, endDay));
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'error sumarry';
      console.log('LONNGGGG ', msg.length, msg);
      await this.db.insert(logs).values({
        description: msg,
        action: PROCCESS.DAILY_PROCESS,
        affectedEntity: 'PINGS',
      });
    }
  }
}
