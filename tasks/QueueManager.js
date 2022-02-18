const Queue = require("bull");

const config = require("../config/configEnv").redis;

const queueTypes = {
  webSocketMessage: "wbesocketMessage",
  pingMonitor: "pingMonitor",
  addPingMonitor: "addPingMonitor",
};

const repeatCron = {
  repeat: {
    every: 1000 * 60, //repetir cada minuto segundos *  minutos
  },
};

const configQueue = {
  limiter: {
    max: 10, //cantidad maxima de procesos que se pueden ejecutar
    duration: 1000 * 5, //máximo tiempo de espera antes de poner el proceso en detención
  },
  redis: {
    port: config.REDIS_PORT,
  },
};

const queueManager = {};

queueManager.webSocket = new Queue(queueTypes.webSocketMessage, configQueue);
queueManager.pingMonitor = new Queue(queueTypes.pingMonitor, configQueue);

queueManager.pingMonitor.process(function (job, done) {
  console.log(job.data);
  done();
});

// Promise.all([
//   queueManager.pingMonitor.clean(0, "active"),
//   queueManager.pingMonitor.clean(0, "wait"),
//   queueManager.pingMonitor.clean(0, "delayed"),
//   queueManager.pingMonitor.clean(0, "failed"),
//   queueManager.pingMonitor.clean(0, "completed"),
// ])
//   .then(function () {
//     console.log("Borrado");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//queueManager.pingMonitor.add({ hola: "Holita" }, repeatCron);

module.exports = queueManager;
