import { PrismaClient, Prisma, TasksEstatus } from "@prisma/client";
import { DateTime } from "luxon";

import { makePing } from "../../utils/pingServer";

const prisma = new PrismaClient();

/** @type {number} Número de filas para procesar */
const SKIP_ROWS = 1000;
const queryAliveSummary = (server, date) => Prisma.sql`
      SELECT
      ROUND(AVG(ps.max), 4)     AS max,
      ROUND(AVG(ps.avg), 4)          AS avg,
      ROUND(AVG(ps.min), 4)          AS min,
      ROUND(AVG(ps.times), 4)        AS times,
      ROUND(AVG(ps.packetLoss), 4)      AS packetLoss,
      ps.numericHost

      FROM PingServidores ps
      where ps.idServidor = ${server}
      AND ps.fechaPing < DATE(${date})
      AND ps.numericHost IS NOT NULL
      GROUP BY  ps.numericHost`;

const queryDownSummary = (server, date) => Prisma.sql`
        SELECT
        ROUND(AVG(ps.max), 4)     AS max,
        ROUND(AVG(ps.avg), 4)          AS avg,
        ROUND(AVG(ps.min), 4)          AS min,
        ROUND(AVG(ps.times), 4)        AS times,
        ROUND(AVG(ps.packetLoss), 4)      AS packetLoss,
        ps.numericHost

        FROM PingServidores ps
        where ps.idServidor = ${server}
        AND ps.isAlive = false
        AND ps.fechaPing < DATE(${date})
        AND ps.numericHost IS NOT NULL
        GROUP BY  ps.numericHost`;

const queryDeleteDayBeforePing = (server, date, dateBefore) => Prisma.sql`
    DELETE
    FROM PingServidores ps
    where ps.idServidor = ${server}
    AND ps.fechaPing < DATE(${date})   AND ps.fechaPing >= DATE(${dateBefore})`;

function dateNow() {
  return DateTime.now().toFormat("MM-dd-yyyy HH:mm:ss");
}

//consumer of daily job
export const dailySummary = async (job, done) => {
  try {
    console.log(`start daily summary ${dateNow()}`);
    let completed = false;
    let skip = 0;
    let take = SKIP_ROWS;
    const tmpDate = DateTime.now();
    const date = DateTime.local(tmpDate.year, tmpDate.month, tmpDate.day).toISO();
    const dateBefore = DateTime.local(tmpDate.year, tmpDate.month, tmpDate.day).minus({ days: 1 }).toISO();
    while (completed == false) {
      const servers = await prisma.servidores.findMany({
        where: {
          estatus: 1,
        },
        take: take,
        skip: skip,
      });

      //si no hay servidores entonces terminar ejecución
      if (servers.length === 0) {
        completed = true;
        break;
      }

      //console.log(servers);
      for (const se of servers) {
        const query = queryAliveSummary(se.idServidor, date);
        const queryDown = queryDownSummary(se.idServidor, date);
        const queryDelete = queryDeleteDayBeforePing(se.idServidor, date, dateBefore);

        //summary of pings alive
        const pingAlive = await prisma.$queryRaw<unknown[]>(query);
        //summary of pings down
        const pingDown = await prisma.$queryRaw<unknown[]>(queryDown);

        const summary = [...pingAlive, ...pingDown].map((ping: any) => ({
          ...ping,
          isAlive: ping.avg ? true : false,
          idServidor: se.idServidor,
        }));

        if (summary.length > 0) {
          //create new summary for data
          const transact = await prisma.$transaction([
            prisma.pingServidores.createMany({
              data: summary,
            }),
            //deleting old data
            prisma.$queryRaw(queryDelete),
          ]);
          console.log("Transaction done ", transact);
        }
      }

      /// sigue la iteración incrementando en 10
      skip += SKIP_ROWS;
    }

    return;
  } catch (e) {
    console.info(e);
  }
};

export const pingConsumer = async (job, done) => {
  try {
    if (job?.data?.idServidor) {
      const server = job.data;
      console.log(`Making ping to ${server.dominio}  ${dateNow()}`);
      const dataPing = await makePing(server.dominio);
      const findServer = await prisma.servidores.findFirst({
        where: {
          idServidor: server.idServidor,
        },
        include: {
          Tasks: true,
        },
      });

      //delete task if server doesn't exist
      if (!findServer) {
        await job.discard();
        await prisma.tasks.update({
          where: {
            idTask: findServer.Tasks[0].idTask,
          },
          data: {
            estatus: TasksEstatus.deleted,
          },
        });
        return;
      }

      await prisma.servidores.update({
        where: {
          idServidor: server.idServidor,
        },
        data: {
          PingServidores: {
            create: {
              times: dataPing.times,
              packetLoss: dataPing.packetLoss,
              min: dataPing.min,
              max: dataPing.max,
              avg: dataPing.avg,
              log: dataPing.log,
              isAlive: dataPing.isAlive,
              numericHost: dataPing.numericHost,
            },
          },
        },
      });
    }
    return done();
  } catch (error) {
    console.log(error.message);
    //  await job.moveToFailed();
    return done(error);
  }
};
