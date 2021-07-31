const Bull = require("bull");
const ping = require("ping");

const { Servidores, PingServidores } = require("../models");

const pingQueue = new Bull("pingQueue");

const myFirstQueue = new Bull("my-first-queue");

const testHost = "www.google.com";

let retries = 0;
let limitRetries = 5;
/* 
const job = myFirstQueue.add(
  {
    foo: "bar",
  },
  {
    repeat: {
      cron: "/1 * * * *",
      limit: 1,
    },
  }
);

myFirstQueue.process(async (job) => {
  let log = await ping.promise.probe(testHost);
  console.log(log);
});

myFirstQueue.on("completed", (job, result) => {
  console.log(job.data);
});
// */

async function makePing(hosts, limit = 10) {
  return await ping.promise.probe(hosts);
}

async function main(limit = 1000, offset = 0) {
  try {
    const logPing = await makePing(testHost);

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
        },
      ],
    });

    process.send(servidores);

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
