const Bull = require("bull");
const ping = require("ping");

const { Servidores, PingServidores, Usuarios } = require("../models");

const pingQueue = new Bull("pingQueue");

const myFirstQueue = new Bull("my-first-queue");

const testHost = "www.google.com";

let retries = 0;
let limitRetries = 5;

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
      main(limit, offset + limit);
    } else {
      timeout(() => main(), 500);
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
  try {
    if (Array.isArray(servers)) {
      let sizeServers = servers.length;
      let count = 0;

      while (count < sizeServers) {
        const server = servers[count];
        const logPing = await makePing(server.ip || server.dominio);
        /*    let testData = {
          inputHost: "www.google.com",
          host: "www.google.com",
          alive: true,
 time: 86,
          times: [86],
          min: "86.000",
          max: "86.000",
          avg: "86.000",
          stddev: "0.000",
          packetLoss: "0.000",
          numeric_host: "142.250.217.228",
        }; */
        let packagesReceived = null;

        if (logPing.time >= 0 && logPing.packetLoss >= 0) {
          packagesReceived =
            formatNumber(logPing.time) - formatNumber(logPing.packetLoss);
        }

        const newPing = await PingServidores.create({
          idServidor: server.idServidor,
          times: parseInt(logPing.time),
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

        console.log(data);
        process.send(data);

        count += count;

        await sleep(500);
      }
    }
  } catch (error) {
    process.send(error);
    return false;
  }
}

function formatNumber(number) {
  return number >= 0 ? parseFloat(number) : number;
}

function castString(str) {
  Buffer.from(str, "utf-8").toString();
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
