import { DrizzleDb } from '@/db';
import { servers } from '@/db/schemas';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { avg, count, eq, sql } from 'drizzle-orm';
import { pings } from '@/db/schemas';
import { DateTime } from 'luxon';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @Inject('DB') private readonly db: DrizzleDb,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async test() {
    const countSelect = this.db.$with('countsq').as(
      this.db
        .select({
          idServer: pings.idServer,
          avg: avg(pings.avg).as('avg'),
          min: avg(pings.min).as('min'),
          max: avg(pings.max).as('max'),
          createdAt: sql`DATE(${pings.createdAt})`.as('createdAt'),
        })
        .from(pings)
        .groupBy(pings.idServer, sql`DATE(${pings.createdAt})`),
    );

    // const data = await this.db.with(countSelect).select().from(countSelect);
    // .innerJoin(countSelect, eq(countSelect.idServer, servers.idServer));
    const data = await this.db
      .select({
        idServer: pings.idServer,
        avg: sql<number>`avg(${pings.avg})`,
        min: sql<number>`min(${pings.avg})`,
        max: sql<number>`max(${pings.avg})`,
        createdAt: sql<Date>`DATE(${pings.createdAt})`.as('createdAt'),
      })
      .from(pings)
      .groupBy(pings.idServer, sql`DATE(${pings.createdAt})`);
    console.log(data);
  }
}
