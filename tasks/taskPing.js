const Bull = require("bull");
const ping = require("ping");

const { Servidores, PingServidores, Usuarios } = require("../models");

const pingQueue = new Bull("pingQueue");

const myFirstQueue = new Bull("my-first-queue");

const testHost = "www.google.com";

let retries = 0;
let limitRetries = 5;
let timeMs = 1000;

async function makePing(hosts, limit = 10) {
  return await ping.promise.probe(hosts);
}

async function main(limit = 1000, offset = 0) {
  try {
    let where = {};

    let servidores = await Servidores.findAndCountAll({
      limit: 1000,
      offset: 0,
      where: where,
      attributes: ["dominio", "ip", "idServidor", "nombre"],
      include: [
        {
          model: Usuarios,
          as: "usuario",
          attributes: ["idUsuario", "nombre", "estatus", "email"],
        },
      ],
    });
    // process.send(servidores.rows[0].usuario);
    await enviarPings(servidores.rows);

    if (!servidores.rows.length < limit) {
      setTimeout(() => main(limit, offset + limit), timeMs);
    } else {
      setTimeout(() => main(), timeMs);
    }
    // process.exit(0);
  } catch (e) {
    // process.exit(0);
    if (retries < limitRetries) {
      main();
      retries++;
    } else {
      process.exit(0);
    }
    throw e;
  }
}

//Iniciar proceso

async function enviarPings(servers) {
  if (Array.isArray(servers)) {
    let sizeServers = servers.length;
    let count = 0;
    while (count < sizeServers) {
      try {
        const server = servers[count];
        const logPing = await makePing(server.ip || server.dominio);

        let packagesReceived = null;

        if (logPing.time >= 0 && logPing.packetLoss >= 0) {
          packagesReceived =
            formatNumber(logPing.time) - formatNumber(logPing.packetLoss);
        }

        const newPing = await PingServidores.create({
          idServidor: server.idServidor,
          times: logPing.time ? parseInt(logPing.time) : null,
          packagesReceived: packagesReceived,
          packetLoss: formatNumber(logPing.packetLoss),
          min: formatNumber(logPing.max),
          max: formatNumber(logPing.max),
          avg: formatNumber(logPing.avg),
          isAlive: logPing.alive,
          log: castString(logPing.output),
        });

        const data = {
          usuario: server.usuario,
          datosPing: newPing,
        };

        process.send({ data });
      } catch (error) {
        console.log(error);
      }

      count += count;
    }
  }
}

function formatNumber(number) {
  return number >= 0 ? parseFloat(number) : null;
}

function castString(str) {
  return Buffer.from(str, "utf-8").toString().replace("\xFFFD", "");
}

function reinicarProceso(obj) {
  if (obj) {
    if (obj.init) {
      process.send("Iniciando Proceso");
      main();
    }
  }
}

process.on("error", (err) => {
  console.error("Ocurrió error ", err.message);
});

process.on("message", (obj) => {
  reinicarProceso(obj);
});
