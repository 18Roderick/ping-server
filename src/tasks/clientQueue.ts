import { v4 as uuid } from "uuid";
import { queueTypes, repeatCron, webSocket } from "./QueueManager";

//agregar nuevo cliente conectado a su sesión
export const addClientConnect = async function (payload) {
  if (!payload) return false;
  const unique = uuid();

  payload.uuid = unique;
  const job = await webSocket.add(queueTypes.webSocketMessage, payload);
  return unique;
};

//remover Client Connect
export const removeSocketClient = async function (key) {
  await webSocket.removeRepeatableByKey(key);
  return key;
};
