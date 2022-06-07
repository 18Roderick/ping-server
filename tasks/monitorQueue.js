const UUID = require("uuid").v4;

const { queueManager, queueTypes, repeatCron, INTERVALS } = require("./QueueManager");

const monitorConsumer = require("./process").monitor;

const JOB_TYPES = {
  DAILY: "DAILYSUMMARY",
  MONTHLY: "MONHTLY",
};

const monitorQueue = {};

//process the pings to the servers
queueManager.pingMonitor.process(queueTypes.pingMonitor, monitorConsumer.pingConsumer);

//process the daily summary of ping data
queueManager.pingMonitor.process(JOB_TYPES.DAILY, monitorConsumer.dailySummary);

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

//agregar worker de ping
monitorQueue.dailySummary = async function (payload) {
  if (!payload) return false;
  const unique = UUID();
  //add a job to summarize the daily data
  const job = await queueManager.pingMonitor.add(JOB_TYPES.DAILY, payload, {
    jobId: unique,
    repeat: {
      every: INTERVALS.EVERY_DAY,
    },
  });
  return job?.opts?.repeat?.key;
};

//stop repeatable job
monitorQueue.stopRepeatable = async function (key) {
  //TODO crea a function to stop repeatable jobs
};

//remover worker de ping
monitorQueue.removePingRepeatable = async function (key) {
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
  for (let job of listJobs) {
    await queueManager.pingMonitor.removeRepeatableByKey(job.key);
  }
  return true;
};

//monitorQueue.removeAllRepeatable().then(console.info).catch(console.error);

//monitorQueue.stop("").then(console.info).catch(console.error);

module.exports = monitorQueue;
