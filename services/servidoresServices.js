const uuid = require("uuid").v4;

const { makePing } = require("../utils/pingServer");

const PingServices = require("./pingServices");

const { PrismaClient, TasksEstatus, TasksTypes } = require("../prisma/generated/prisma-client-js");
const monitorQueue = require("../tasks/monitorQueue");

const prisma = new PrismaClient();

const ServidoresServices = {};

const ESTATUS_SERVIDORES = {
  ACTIVO: 1,
  VALIDADO: 2,
  DESACTIVADO: 3,
};

ServidoresServices.getServerDetail = async function (idServidor) {
  let servidores = await prisma.servidores.findFirst({
    where: {
      idServidor: idServidor,
    },
    include: {
      Tasks: true,
    },
  });

  return servidores;
};

ServidoresServices.getServers = async function (id) {
  const search = {};
  if (!isNaN(id)) search.idUsuario = id;
  else search.publicId = id;
  const servidores = await prisma.servidores.findMany({
    where: {
      Usuarios: {
        ...search,
      },
    },
    include: {
      PingServidores: {
        take: 1,
      },
    },
  });

  return servidores;
};

ServidoresServices.createServer = async function (bodyServer) {
  let taskCreated = null;
  try {
    const data = await prisma.$transaction(async (prisma) => {
      const errors = [];

      const usuario = await prisma.usuarios.findFirst({
        where: { idUsuario: bodyServer.idUsuario },
      });

      if (!usuario) return { errors: ["Usuario no encontrado"] };

      const servidor = await prisma.servidores.findFirst({
        where: {
          dominio: bodyServer.dominio,
          idUsuario: usuario.idUsuario,
        },
      });

      //buscar ip del servidor si no fue enviada

      if (!bodyServer.ip) {
        const pingData = await makePing(bodyServer.dominio);
        bodyServer.ip = pingData.numericHost;
      }

      if (servidor) return { errors: ["Servidor ya existe"] };
      //crear nuevo servidor
      const server = await prisma.servidores.create({
        data: {
          publicId: uuid(),
          idUsuario: usuario.idUsuario,
          descripcion: bodyServer.descripcion ?? null,
          nombre: bodyServer.nombre,
          ip: bodyServer.ip,
          dominio: bodyServer.dominio,
          estatus: ESTATUS_SERVIDORES.ACTIVO,
        },
      });

      //creación de ping en cola
      taskCreated = await monitorQueue.addPing(server);

      const task = await prisma.tasks.create({
        data: {
          idServidor: server.idServidor,
          estatus: TasksEstatus.running,
          idTask: taskCreated,
          type: TasksTypes.SERVER,
        },
      });

      return { servidor: server, task: task };
    });

    return data;
  } catch (error) {
    if (taskCreated != null) monitorQueue.removePingRepeatable(taskCreated);
    console.log(error);

    throw new Error(error);
  }
};

ServidoresServices.createUserServer = async function (bodyServer) {
  let servidor = await prisma.usuarios.update({
    where: {
      idUsuario: bodyServer.idUsuario,
    },
    data: {
      UsuariosServidores: {
        create: {
          nombre: bodyServer.nombre,
          descripcion: bodyServer.descripcion,
          servidor: {
            create: {
              ip: bodyServer.ip,
              dominio: bodyServer.dominio,
            },
          },
        },
      },
    },
    include: {
      UsuariosServidores: {
        include: {
          servidor: true,
        },
      },
    },
  });
  const taskPing = await PingServices.addServerPing(servidor);

  return { servidor, task: taskPing };
};

module.exports = ServidoresServices;
