const UUID = require("uuid").v4;
const PingServidores = require("../models/ping_servidores");

const { queueManager, queueTypes, repeatCron } = require("./QueueManager");

const monitorQueue = {};

queueManager.pingMonitor.process(function (job, done) {
  console.log("Ejecutando Proceso", job.data);
  done();
});

//agregar worker de ping
monitorQeue.addPing = async function (payload) {
  if (!payload) return false;
  const unique = UUID();

  const job = await queueManager.pingMonitor.add(queueTypes.pingMonitor, payload, {
    ...repeatCron(),
    jobId: unique,
  });
  return job?.opts?.repeat?.key;
};

//remover worker de ping
monitorQeue.removePing = async function (key) {
  console.log("Borrando Job");
  const result = await queueManager.pingMonitor.removeRepeatableByKey(key);
  console.log("Respuesta de Borrado ", result);
  return key;
};

//remover todos los pings
monitorQeue.removeAllPing = async function () {
  await queueManager.pingMonitor.empty();
  await queueManager.pingMonitor.removeJobs();
};

module.exports = monitorQueue;
