const Queue = require("bull");
const config = require("../config/configEnv").redis;

const queueTypes = {
  webSocketMessage: "websocketMessage",
  pingMonitor: "pingMonitor",
  addPingMonitor: "addPingMonitor",
  serverTasks: "serverTasks",
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
    host: config.REDIS_HOST,
  },
};

const queueManager = {};

queueManager.webSocket = new Queue(queueTypes.webSocketMessage, configQueue);
queueManager.pingMonitor = new Queue(queueTypes.pingMonitor, configQueue);

queueManager.serverTasks = new Queue(queueTypes.serverTasks, configQueue);

module.exports = {
  queueManager,
  queueTypes,
  repeatCron,
};
