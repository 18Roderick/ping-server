const monitorQueue = require("../tasks/monitorQueue");
const PingServices = {};

const { PrismaClient, TasksEstatus, Prisma } = require("../prisma/generated/prisma-client-js");

const prisma = new PrismaClient();

PingServices.addServerPing = async function (server, transaction = null) {
  try {
    if (!server?.dominio && !server?.ip) throw new Error("Datos del servidor no fueron Proporcionados");
    let config = {};

    if (transaction) config.transaction = transaction;

    const taskId = await monitorQueue.addPing(server);

    //return newTask;
    return prisma.servidores.update({
      where: {
        idServidor: server.idServidor,
      },
      data: {
        Tasks: {
          create: {
            data: {
              idUsuario: server.idUsuario,
              idServidor: server.idServidor,
              estatus: TasksEstatus.running,
              taskId: taskId,
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
PingServices.removeServerPing = function () {};

module.exports = PingServices;
