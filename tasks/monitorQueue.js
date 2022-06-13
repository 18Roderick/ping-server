const UUID = require("uuid").v4;

const { queueManager, queueTypes, INTERVALS } = require("./QueueManager");

const { PrismaClient, TasksTypes, TasksEstatus } = require("../prisma/generated/prisma-client-js");

const monitorConsumer = require("./process").monitor;

const JOB_TYPES = {
  DAILY: "DAILYSUMMARY",
  MONTHLY: "MONHTLY",
};

const monitorQueue = {};

const prisma = new PrismaClient();

//function find repeatable jobs
async function findRepeatableJob(key) {
  const listJobs = await queueManager.pingMonitor.getRepeatableJobs();
  for (let job of listJobs) {
    if (job.key === key) return job;
  }
  return null;
}

//process the pings to the servers
queueManager.pingMonitor.process(queueTypes.pingMonitor, monitorConsumer.pingConsumer);

//process the daily summary of ping data
queueManager.pingMonitor.process(JOB_TYPES.DAILY, monitorConsumer.dailySummary);

//agregar worker de ping
monitorQueue.addPing = async function (payload) {
  if (!payload) return false;
  const unique = UUID();
  const job = await queueManager.pingMonitor.add(queueTypes.pingMonitor, payload, {
    repeat: {
      every: INTERVALS.TWO_MINUTES,
    },
    jobId: unique,
  });
  return job?.opts?.repeat?.key;
};

//agregar worker de ping
monitorQueue.dailySummary = async function () {
  const unique = UUID();
  //add a job to summarize the daily data
  let task = await prisma.tasks.findFirst({
    where: {
      type: TasksTypes.SUMMARY,
    },
  });

  const newJob = () =>
    queueManager.pingMonitor.add(
      JOB_TYPES.DAILY,
      {},
      {
        jobId: unique,
        repeat: {
          cron: INTERVALS.EVERY_DAY,
        },
      }
    );

  if (!task) {
    const job = await newJob();

    task = await prisma.tasks.create({
      data: {
        type: TasksTypes.SUMMARY,
        idTask: job?.opts?.repeat?.key,
        estatus: TasksEstatus.running,
      },
    });
    return job?.opts?.repeat?.key;
  } else {
    const job = await findRepeatableJob(task.idTask);
    if (job == null) {
      const job = await newJob();
      task = await prisma.tasks.update({
        where: { id: task.id },
        data: {
          idTask: job?.opts?.repeat?.key,
        },
      });
    }
  }
  return task?.idTask;
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
