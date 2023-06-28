import { v4 as uuid } from "uuid";
import * as cipher from "../utils/cipher";

import { queueTypes, serverTasks } from "./QueueManager";

import { PrismaClient } from "@prisma/client";

import listaUsuarios from "../data/estatusUsuarios.json";
import estatusUsuarios from "../data/estatusUsuarios.json";

const taskVerifyDatabaseData = "taskVerifyDatabaseData" as const;

const prisma = new PrismaClient();

serverTasks.process(async function (job, done) {
  console.log("Ejecutando Proceso", job.data);
  return;
});

serverTasks.process(taskVerifyDatabaseData, async function (job, done) {
  try {
    const listaStatusServidores = await prisma.estatusServidores.findMany();
    const listaStatusUsuarios = await prisma.estatusUsuarios.findMany();
    //run:seeds
    if (listaStatusServidores.length === 0) {
      await prisma.estatusServidores.createMany({
        data: listaUsuarios,
      });
    }

    if (listaStatusUsuarios.length === 0) {
      await prisma.estatusUsuarios.createMany({
        data: estatusUsuarios,
      });
    }

    // if (process.env.NODE_ENV === "development") {
    //   const [userData] = require("../data/usuarioDefault.json");
    //   const userDefault = await prisma.usuarios.findUnique({ where: { email: userData.email } });
    //   //si no existe el usuario entonces crearlo
    //   if (!userDefault?.email) {
    //     userData.password = await cipher.encrypt(userData.password);
    //     console.info("Creando Usuario de prueba");
    //     await prisma.usuarios.create({ data: userData });
    //   }
    // }

    return;
  } catch (error) {
    console.error(error.message);
  }
});

serverTasks.on("error", (e) => console.log(e));

//agregar worker de ping
export const addTasks = async function (payload) {
  if (!payload) return false;
  const job = await serverTasks.add(queueTypes.serverTasks, payload);
  return job.id;
};

//agregar worker de ping
export const verifyDatabaseData = async function () {
  const lastJob = await serverTasks.getJob(taskVerifyDatabaseData);

  if (!lastJob) {
    const job = await serverTasks.add(uuid(), taskVerifyDatabaseData, {
      removeOnComplete: true,
      jobId: taskVerifyDatabaseData,
    });
    return job?.id;
  } else {
    if (["completed", "failed", "stuck"].includes(await lastJob.getState())) {
      console.log("entrando");
      await lastJob.retry();
    }
    return lastJob.id;
  }
};
