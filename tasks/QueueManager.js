const Queue = require("bull");
const UUID = require("uuid").v4;
const config = require("../config/configEnv").redis;

const queueTypes = {
  webSocketMessage: "websocketMessage",
  pingMonitor: "pingMonitor",
  addPingMonitor: "addPingMonitor",
};

//devuelve el objeto de configuracion con la cantidad solicitada
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

//agregar worker de ping
queueManager.addPing = function (payload) {
  const unique = UUID();
  this.pingMonitor.add(unique, payload, repeatCron());
  return unique;
};

//remover worker de ping
queueManager.removePing = function (key) {
  this.pingMonitor.removeRepeatableByKey(key);
  return key;
};

//remover todos los pings
queueManager.removeAllPing = function () {
  this.pingMonitor.empty();
};

//agregar nuevo cliente conectado a su sesion
queueManager.addClientConnect = function (payload) {
  const unique = UUID();
  this.webSocket.add(unique, payload, repeatCron());
  return unique;
};

//remover worker de ping
queueManager.removePing = function (key) {
  this.webSocket.removeRepeatableByKey(key);
  return key;
};

queueManager.pingMonitor.process(function (job, done) {
  console.log("Ejecutando Proceso", job.data);
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

queueManager.pingMonitor.add(UUID(), { hola: "Holita" }, repeatCron(1));

//console.log(queueManager.addPing({ message: "Hola" }));

module.exports = queueManager;
