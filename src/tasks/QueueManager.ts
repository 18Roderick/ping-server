import Queue from "bull";
import config from "../config/configEnv";

const { redis } = config;

export const queueTypes = {
  webSocketMessage: "websocketMessage",
  pingMonitor: "pingMonitor",
  addPingMonitor: "addPingMonitor",
  serverTasks: "serverTasks",
};

/**@typedef {Object} INTERVALS */
/**
 * @property {number} FIVE_MINUTES 5 minutes in mili seconds
 * @property {number} ONE_MINUTE 1 minutes in mili seconds
 * @property {number} TWO_MINUTES 2 minutes in mili seconds
 * @property {number} TEN_MINUTES 10 minutes in mili seconds
 * @property {number} ONE_HOUR 1 hour in mili seconds
 * @property {number} EVERY_DAY every day at 12am
 * @property {number} EVERY_MONTH Every month on the last Sunday, at noon
 */
export const INTERVALS = {
  FIVE_MINUTES: 1000 * 60 * 5,
  ONE_MINUTE: 1000 * 60 * 1,
  TWO_MINUTES: 1000 * 60 * 2,
  TEN_MINUTES: 1000 * 60 * 10,
  ONE_HOUR: 1000 * 60 * 60,
  EVERY_DAY: "0 0 0 * * ?", //every day at 12am
  EVERY_MONTH: "0 0 12 1L * ?", //Every month on the last Sunday, at noon
} as const;

//devuelve el objeto de configuración con la cantidad solicitada
/** @function */
/** @param {number} time - number os minutes between */
/** @typedef
 * @property {object}
 */
export const repeatCron = (time = 2) => ({
  repeat: {
    every: 1000 * 60 * time, //repetir cada minuto segundos *  minutos
  },
});

const configQueue: Queue.QueueOptions = {
  limiter: {
    max: 10, //cantidad maxima de procesos que se pueden ejecutar
    duration: 1000 * 5, //máximo tiempo de espera antes de poner el proceso en detención
  },
  redis: {
    port: redis.REDIS_PORT as number,
    host: redis.REDIS_HOST,
  },
};

export const webSocket = new Queue(queueTypes.webSocketMessage, configQueue);
export const pingMonitor = new Queue(queueTypes.pingMonitor, configQueue);

export const serverTasks = new Queue(queueTypes.serverTasks, configQueue);
