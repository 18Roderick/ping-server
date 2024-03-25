import { DrizzleDb } from '@/db';
import { logs, servers } from '@/db/schemas';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { avg, count, eq, sql } from 'drizzle-orm';
import { pings } from '@/db/schemas';
import { DateTime } from 'luxon';
import { dailySummary } from '@/db/sql';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(@Inject('DB') private readonly db: DrizzleDb) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async test() {
    try {
      const script = await dailySummary();

      const data =[]// await this.db.execute(sql.raw(script));

      console.log('SUMMARY ENDED', data);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'error sumarry';
      console.log("LONNGGGG ", msg.length, msg)
      await this.db.insert(logs).values({
        description: msg,
        action: 'SUMMARY PROCESS',
        affectedEntity: 'PINGS',
      });
    }
  }
}
