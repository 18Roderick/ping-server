const UUID = require("uuid").v4;
const cipher = require("../utils/cipher");

const { queueManager, queueTypes } = require("./QueueManager");

const { PrismaClient } = require("../providers/prismaProvider");

const taskVerifyDatabaseData = "taskVerifyDatabaseData";

const monitorTasks = {};

const prisma = new PrismaClient();

queueManager.serverTasks.process(async function (job, done) {
  console.log("Ejecutando Proceso", job.data);
  return;
});

queueManager.serverTasks.process(taskVerifyDatabaseData, async function (job, done) {
  try {
    const listaStatusServidores = await prisma.estatusServidores.findMany();
    const listaStatusUsuarios = await prisma.estatusUsuarios.findMany();
    //run:seeds
    if (listaStatusServidores.length === 0) {
      await prisma.estatusServidores.createMany(require("../data/estatusServidores.json"));
    }

    if (listaStatusUsuarios.length === 0) {
      await prisma.estatusUsuarios.createMany(require("../data/estatusUsuarios.json"));
    }

    if (process.env.NODE_ENV === "development") {
      const [userData] = require("../data/usuarioDefault.json");
      const userDefault = await prisma.usuarios.findUnique({ where: { email: userData.email } });
      //si no existe el usuario entonces crearlo
      if (!userDefault?.email) {
        userData.password = await cipher.encrypt(password);
        console.info("Creando Usuario de prueba");
        await prisma.usuarios.create({ data: userData });
      }
    }

    return;
  } catch (error) {
    console.error(error.message);
    return;
  }
});

queueManager.serverTasks.on("error", (e) => console.log(e));

//agregar worker de ping
monitorTasks.addTasks = async function (payload) {
  if (!payload) return false;
  const job = await queueManager.serverTasks.add(queueTypes.serverTasks, payload);
  return job?.opts?.repeat?.key;
};

//agregar worker de ping
monitorTasks.verifyDatabaseData = async function () {
  const lastJob = await queueManager.serverTasks.getJob(taskVerifyDatabaseData);

  if (!lastJob) {
    const job = await queueManager.serverTasks.add(taskVerifyDatabaseData, UUID(), {
      removeOnCompleted: true,
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

module.exports = monitorTasks;
