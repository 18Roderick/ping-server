const { PingServidores, Tasks } = require("../models");
const monitorQueue = require("../tasks/monitorQueue");
const PingServices = {};

PingServices.addServerPing = async function (server, transaction = null) {
  try {
    if (!server?.dominio && !server?.ip) throw new Error("Datos del servidor no fueron Proporcionados");
    let config = {};

    if (transaction) config.transaction = transaction;

    const taskId = await monitorQueue.addPing(server);
    console.log("Creando Tarea en la tabla de Tareas", await Tasks.findAll());
    const newTask = await Tasks.create(
      { idTask: taskId, estatus: "running", idServidor: server.idServidor },
      config
    );

    console.log("Nueva Tarea Creada");

    return newTask;
  } catch (error) {
    throw new Error(error.message);
  }
};
PingServices.removeServerPing = function () {};

module.exports = PingServices;
