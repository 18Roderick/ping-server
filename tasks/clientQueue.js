const UUID = require("uuid").v4;
const PingServidores = require("../models/ping_servidores");

const { queueManager, queueTypes, repeatCron } = require("./QueueManager");

const clientQueue = {};

//agregar nuevo cliente conectado a su sesión
clientQueue.addClientConnect = async function (payload) {
  if (!payload) return false;
  const unique = UUID();

  payload.uuid = unique;
  const job = await queueManager.webSocket.add(queueTypes.webSocketMessage, payload);
  return unique;
};

//remover Client Connect
clientQueue.removeSocketClient = async function (key) {
  await queueManager.webSocket.removeRepeatableByKey(key);
  return key;
};
