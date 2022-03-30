const Queue = require("bull");
const config = require("../config/configEnv").redis;

const queueTypes = {
  webSocketMessage: "websocketMessage",
  pingMonitor: "pingMonitor",
  addPingMonitor: "addPingMonitor",
};

//devuelve el objeto de configuración con la cantidad solicitada
const repeatCron = (time = 2) => ({
  repeat: {
    every: 1000 * 60 * time, //repetir cada minuto segundos *  minutos
  },
});

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

// queueManager.pingMonitor
//   .getRepeatableJobs()
//   //.count()
//   .then(function (count) {
//     console.log("Elementos en la cola ", count);
//   })
//   .catch(console.error);

// queueManager.pingMonitor
//   .empty()
//   .then(function () {
//     console.log("Cola Vaciada");
//   })
//   .catch(console.error);

//queueManager.addPing({ message: "Hola" }).then((key) => console.log(key));

module.exports = {
  queueManager,
  queueTypes,
  repeatCron,
};
