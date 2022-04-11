const { PingServidores, Tasks } = require("../models");
const monitorQueue = require("../tasks/monitorQueue");
const PingServices = {};

PingServices.addServerPing = async function (server) {
  if (!server?.dominio || !server?.ip) throw new Error("Datos del servidor no fueron Proporcionados");

  const taskId = await monitorQueue.addPing(server);
  const newTask = await Tasks.create({ idTask: taskId, status: "running" });

  console.log("Nueva Tarea Creada");

  return newTask;
};
PingServices.removeServerPing = function () {};

module.exports = PingServices;
