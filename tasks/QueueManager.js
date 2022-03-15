const Queue = require("bull");
const UUID = require("uuid").v4;
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

//agregar worker de ping
queueManager.addPing = async function (payload) {
  if (!payload) return false;
  const unique = UUID();

  const job = await this.pingMonitor.add(queueTypes.pingMonitor, payload, { ...repeatCron(), jobId: unique });
  return job?.opts?.repeat?.key;
};

//remover worker de ping
queueManager.removePing = async function (key) {
  console.log("Borrando Job");
  const result = await this.pingMonitor.removeRepeatableByKey(key);
  console.log("Respuesta de Borrado ", result);
  return key;
};

//remover todos los pings
queueManager.removeAllPing = async function () {
  await this.pingMonitor.empty();
  await this.pingMonitor.removeJobs();
};

//agregar nuevo cliente conectado a su sesión
queueManager.addClientConnect = function (payload) {
  if (!payload) return false;
  const unique = UUID();

  payload.uuid = unique;
  this.webSocket.add(unique, payload, { ...repeatCron(), jobId: unique });
  return unique;
};

//remover Client Connect
queueManager.removeSocketClient = function (key) {
  this.webSocket.removeRepeatableByKey(key);
  return key;
};

queueManager.pingMonitor.process(function (job, done) {
  console.log("Ejecutando Proceso", job.data);
  done();
});

queueManager.pingMonitor.process(queueTypes.pingMonitor, function (job, done) {
  console.log("Ejecutando Proceso", job.data);
  done();
});

queueManager.pingMonitor
  .getRepeatableJobs()
  //.count()
  .then(function (count) {
    console.log("Elementos en la cola ", count);
  })
  .catch(console.error);

// queueManager.pingMonitor
//   .empty()
//   .then(function () {
//     console.log("Cola Vaciada");
//   })
//   .catch(console.error);

//queueManager.addPing({ message: "Hola" }).then((key) => console.log(key));

module.exports = queueManager;
