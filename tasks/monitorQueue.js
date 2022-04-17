const UUID = require("uuid").v4;
const { PingServidores } = require("../models");
const { makePing } = require("../utils/pingServer");
const { queueManager, queueTypes, repeatCron } = require("./QueueManager");

const dailySumary = "DAILYSUMMARY";

const monitorQueue = {};

queueManager.pingMonitor.process(queueTypes.pingMonitor, async function (job, done) {
  try {
    if (job?.data?.idServidor) {
      const server = job.data;
      console.log("Making ping to ", server.dominio);
      const dataPing = await makePing(server.dominio);
      await PingServidores.create({
        idServidor: server.idServidor,
        ...dataPing,
      });
    }
    return done();
  } catch (error) {
    console.log(error.message);
    await job.moveToFailed();
    return done(error);
  }
});

queueManager.pingMonitor.process(dailySumary, async (job, done) => {
  try {
  } catch (error) {
    return done(error);
  }
});

//agregar worker de ping
monitorQueue.addPing = async function (payload) {
  if (!payload) return false;
  const unique = UUID();
  const job = await queueManager.pingMonitor.add(queueTypes.pingMonitor, payload, {
    ...repeatCron(),
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

//remover todos los jobs repetitivos
monitorQueue.removeAllRepeatable = async function () {
  const listJobs = await queueManager.pingMonitor.getRepeatableJobs();
  console.log(listJobs);
  let i = 0;

  while (i < listJobs.length) {
    await queueManager.pingMonitor.removeRepeatableByKey(listJobs[i].key);
    i++;
  }
  return true;
};

//monitorQueue.removeAllRepeatable().then(console.info).catch(console.error);

module.exports = monitorQueue;
