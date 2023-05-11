import * as monitorQueue from "../tasks/monitorQueue";
import { PrismaClient, TasksEstatus, TasksTypes, Prisma, Servidores } from "@prisma/client";

const prisma = new PrismaClient();

export const addServerPing = async function (Servidores: Servidores, transaction = null) {
  try {
    if (!server?.dominio && !server?.ip) throw new Error("Datos del servidor no fueron Proporcionados");

    const taskId = await monitorQueue.addPing(server);

    //return newTask;
    return prisma.servidores.update({
      where: {
        idServidor: server.idServidor,
      },
      data: {
        Tasks: {
          create: {
            idTask: taskId as string,
            estatus: TasksEstatus.running,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
export const removeServerPing = function () {};
