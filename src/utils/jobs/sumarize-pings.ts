import { db } from '@/db';
import { PingInsert, pings, servers } from '@/db/schemas';
import { avg, max, min, sql, eq, and, gte, lte } from 'drizzle-orm';
import { DateTime } from 'luxon';

type CTXType = typeof db;


export enum PROCCESS  {
  HOURLY_PROCESS = "HOURLY_PROCESS",
  DAILY_PROCESS = "DAILY_PROCESS"
}



export const SummaryPingByRange = async (ctx: CTXType, startDate: DateTime, endDate: DateTime) => {
  //list al active servers
  const listServer = await ctx.select().from(servers).where(eq(servers.status, 'ACTIVE'));
  const groupedPings = await ctx
    .select({
      idServer: pings.idServer,
      times: sql<number>`${avg(pings.times)}`.as('times'),
      avg: sql<number>`avg(${pings.avg})`.as('avg'),
      min: sql<number>`${min(pings.avg)}`.as('min'),
      max: sql<number>`${max(pings.avg)}`.as('max'),
      numerciHost: max(pings.numericHost).as('numerciHost'),
      packetLoss: sql<number>`${avg(pings.packetLoss)}`.as('packetLoss'),
      isAlive: sql<number>`CASE WHEN ${avg(pings.isAlive)} >= 0.5 THEN 1 ELSE 0 END`.as('isAlive'),
    })
    .from(pings)
    .where(
      and(gte(pings.createdAt, startDate.toJSDate()), lte(pings.createdAt, endDate.toJSDate())),
    )
    .groupBy(pings.idServer);

  // delete pings of the date recoledted
  const deletedRows = await ctx
    .delete(pings)
    .where(
      and(gte(pings.createdAt, startDate.toJSDate()), lte(pings.createdAt, startDate.toJSDate())),
    );

  if (deletedRows[0].affectedRows) {
    //do somthing with this , rows were delete successfully
  }

  //insert new rows with the summary data
  const plus = 10;
  for (let index = 0; index < groupedPings.length; index += plus) {
    //prepare data for insert
    const part = groupedPings.slice(index, plus).map(
      (g) =>
        ({
          idServer: g.idServer,
          times: g.times,
          packetLoss: g.packetLoss,
          min: g.min,
          max: g.max,
          avg: g.avg,
          log: 'SUMARIZE OF THE HOUR',
          isAlive: g.isAlive,
          numericHost: g.numerciHost,
        }) as PingInsert,
    );

    const insertedRows = await ctx.insert(pings).values(part);

    if (insertedRows.length > 0) {
      //TODO: do something with this
    }
  }
};
