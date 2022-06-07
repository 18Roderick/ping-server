const { PrismaClient, Prisma } = require("../prisma/generated/prisma-client-js");
const { DateTime } = require("luxon");

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

const queryDeleteDayBeforePing = (server, date) => Prisma.sql`
    DELETE
    FROM PingServidores ps
    where ps.idServidor = ${server} 
    AND ps.fechaPing < DATE(${date})`;
async function test() {
  const prisma = new PrismaClient();

  try {
    let completed = false;
    let skip = 0;
    let take = 10;
    const tmpDate = DateTime.now();
    const date = DateTime.local(tmpDate.year, tmpDate.month, tmpDate.day).toISO();

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
        const queryDelete = queryDeleteDayBeforePing(se.idServidor, date);

        //summary of pings alive
        const pingAlive = await prisma.$queryRaw(query);
        //summary of pings down
        const pingDown = await prisma.$queryRaw(queryDown);

        const summary = [...pingAlive, ...pingDown].map((ping) => ({
          ...ping,
          isAlive: ping.avg ? true : false,
          idServidor: se.idServidor,
        }));

        if (summary.length > 0) {
          const transact = await prisma.$transaction([
            prisma.pingServidores.createMany({
              data: summary,
            }),
            prisma.$queryRaw(queryDelete),
          ]);
          console.log("Transaction done ", transact);
        }
      }

      /// sigue la iteración incrementando en 10
      skip += 10;
    }
  } catch (e) {
    console.info(e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
