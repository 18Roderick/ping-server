const UUID = require("uuid").v4;
const { EstatusServidores, EstatusUsuarios, Usuarios } = require("../models");

const { queueManager, queueTypes } = require("./QueueManager");

const taskVerifyDatabaseData = "taskVerifyDatabaseData";

const monitorTasks = {};

queueManager.serverTasks.process(async function (job, done) {
  console.log("Ejecutando Proceso", job.data);
  return;
});

queueManager.serverTasks.process(taskVerifyDatabaseData, async function (job, done) {
  try {
    const listaStatusServidores = await EstatusServidores.findAll();
    const listaStatusUsuarios = await EstatusUsuarios.findAll();
    //run:seeds
    if (listaStatusServidores.length === 0) {
      await EstatusServidores.bulkCreate(require("../data/estatusServidores.json"));
    }

    if (listaStatusUsuarios.length === 0) {
      await EstatusUsuarios.bulkCreate(require("../data/estatusUsuarios.json"));
    }

    if (process.env.NODE_ENV === "development") {
      const [userData] = require("../data/usuarioDefault.json");
      const userDefault = await Usuarios.findOne({ where: { email: userData.email } });
      //si no existe el usuario entonces crearlo
      if (!userDefault?.email) {
        console.info("Creando Usuario de prueba");
        await Usuarios.create(userData);
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
  const job = await queueManager.serverTasks.add(taskVerifyDatabaseData, 1, {
    removeOnCompleted: true,
    jobId: taskVerifyDatabaseData,
  });
  return job?.id;
};

module.exports = monitorTasks;
