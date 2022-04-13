const UUID = require("uuid").v4;
const { PingServidores } = require("../models");
const { makePing } = require("../utils/pingServer");
const { queueManager, queueTypes, repeatCron } = require("./QueueManager");

const monitorQueue = {};

queueManager.pingMonitor.process(queueTypes.pingMonitor, async function (job, done) {
  if (job?.data?.idServidor) {
    const server = job.data;
    const dataPing = await makePing(server.dominio);
    PingServidores.create({
      idServidor: server.idServidor,
      ...dataPing,
    });
  }
  return;
});

//agregar worker de ping
monitorQueue.addPing = async function (payload) {
  if (!payload) return false;
  const unique = UUID();
  const job = await queueManager.pingMonitor.add(queueTypes.pingMonitor, payload, {
    ...repeatCron(),
    jobId: unique,
  });
  return job?.opts?.repeat?.key;
};

//remover worker de ping
monitorQueue.removePing = async function (key) {
  console.log("Borrando Job");
  const result = await queueManager.pingMonitor.removeRepeatableByKey(key);
  console.log("Respuesta de Borrado ", result);
  return key;
};

//remover todos los pings
monitorQueue.removeAllPing = async function () {
  await queueManager.pingMonitor.empty();
  await queueManager.pingMonitor.removeJobs();
};

// monitorQueue
//   .removePing("pingMonitor:314d3650-08e0-4015-916d-830d0c2e02cd::120000")
//   .then(console.log)
//   .catch(console.log);

// queueManager.pingMonitor.getRepeatableJobs().then(console.log);

module.exports = monitorQueue;
