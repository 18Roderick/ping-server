import type { DB } from '@/db';
import { PingInsert, pings, servers } from '@/db/schemas';
import { avg, max, min, sql, eq, and, gte, lte } from 'drizzle-orm';
import { DateTime } from 'luxon';



export enum PROCCESS {
  HOURLY_PROCESS = 'HOURLY_PROCESS',
  DAILY_PROCESS = 'DAILY_PROCESS',
}

export const SummaryPingByRange = async (ctx: DB, startDate: DateTime, endDate: DateTime) => {
  //list al active servers
  const listServer = await ctx.select().from(servers).where(eq(servers.status, 'active'));
  const groupedPings = await ctx
    .select({
      idServer: pings.id_server,
      times: sql<number>`${avg(pings.times)}`.as('times'),
      avg: sql<number>`avg(${pings.avg})`.as('avg'),
      min: sql<number>`${min(pings.avg)}`.as('min'),
      max: sql<number>`${max(pings.avg)}`.as('max'),
      numerciHost: max(pings.numeric_host).as('numerciHost'),
      packetLoss: sql<number>`${avg(pings.packet_loss)}`.as('packetLoss'),
      isAlive: sql<number>`CASE WHEN ${avg(pings.is_alive)} >= 0.5 THEN 1 ELSE 0 END`.as('isAlive'),
    })
    .from(pings)
    .where(
      and(gte(pings.created_at, startDate.toJSDate()), lte(pings.created_at, endDate.toJSDate())),
    )
    .groupBy(pings.id_server);

  // delete pings of the date recoledted
  const deletedRows = await ctx
    .delete(pings)
    .where(
      and(gte(pings.created_at, startDate.toJSDate()), lte(pings.created_at, startDate.toJSDate())),
    );

  if (deletedRows.length > 0) {
    //do somthing with this , rows were delete successfully
  }

  //insert new rows with the summary data
  const plus = 10;
  for (let index = 0; index < groupedPings.length; index += plus) {
    //prepare data for insert
    const part = groupedPings.slice(index, plus).map(
      (g) =>
        ({
          id_Server: g.idServer,
          times: g.times,
          packet_loss: g.packetLoss,
          min: g.min,
          max: g.max,
          avg: g.avg,
          log: 'SUMARIZE OF THE HOUR',
          is_alive: g.isAlive,
          numeric_host: g.numerciHost,
        }) as unknown as PingInsert,
    );

    const insertedRows = await ctx.insert(pings).values(part);

    if (insertedRows.length > 0) {
      //TODO: do something with this
    }
  }
};
