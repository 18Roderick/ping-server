const { Op } = require("sequelize");
const Ajv = require("ajv");

const { makePing } = require("../utils/pingServer");

const PingServices = require("./pingServices");

const { PrismaClient } = require("../prisma/generated/prisma-client-js");
const monitorQueue = require("../tasks/monitorQueue");
const { update } = require("tar");

const prisma = new PrismaClient();

const ServidoresServices = {};

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

ServidoresServices.getServers = async function (idUsuario) {
  const servidores = await prisma.servidores.findMany({
    where: {
      UsuariosServidores: {
        every: {
          idUsuario: idUsuario,
        },
      },
    },
  });
  // let servidores = await Servidores.findAll({
  //   where: {},
  //   order: [["fechaCreacion", "DESC"]],
  //   attributes: { exclude: ["idUsuario"] },
  //   include: [
  //     {
  //       model: Usuarios,
  //       as: "usuario",
  //       where: { publicId: idUsuario },
  //       attributes: [],
  //     },
  //     {
  //       model: PingServidores,
  //       as: "pings",
  //       attributes: { exclude: ["idPingServidor", "idServidor"] },
  //       order: [["fechaPing", "DESC"]],
  //       limit: 1,
  //     },
  //   ],
  // });

  return servidores;
};

ServidoresServices.createServer = async function (bodyServer) {
  let taskCreated = null;
  let serverUpdated = false;
  try {
    const data = await prisma.$transaction(async (prisma) => {
      const errors = [];

      const usuario = await prisma.usuarios.findFirst({
        where: { idUsuario: bodyServer.idUsuario },
        // include: { model: Servidores, as: "servidor", where: { idUsuario: bodyServer.idUsuario } },
      });

      if (!usuario) return { errors: ["Usuario no encontrado"] };

      const servidor = await prisma.servidores.findFirst({
        where: {
          dominio: bodyServer.dominio,
          UsuariosServidores: {
            every: {
              idUsuario: usuario.idUsuario,
            },
          },
        },
        include: {
          UsuariosServidores: true,
        },
      });

      //buscar ip del servidor si no fue enviada

      if (!bodyServer.ip) {
        const pingData = await makePing(bodyServer.dominio);
        bodyServer.ip = pingData.numericHost;
      }

      let newServidor;

      if (servidor) {
        //actualización de servidor

        newServidor = await prisma.usuarios.update({
          where: {
            idUsuario: usuario.idUsuario,
          },
          data: {
            UsuariosServidores: {
              create: {
                descripcion: bodyServer.descripcion,
                nombre: bodyServer.nombre,
              },
              connectOrCreate: {
                idUsuario_idServidor: {
                  idServidor: servidor.idServidor,
                  idUsuario: usuario.idUsuario,
                },
              },
            },
          },
        });

        //servidor actualizado
        serverUpdated = true;
      } else {
        //crear nuevo servidor
        newServidor = await prisma.usuarios.update({
          where: {
            idUsuario: usuario.idUsuario,
          },
          data: {
            UsuariosServidores: {
              create: {
                descripcion: bodyServer.descripcion ?? null,
                nombre: bodyServer.nombre,
                servidor: {
                  create: {
                    ip: bodyServer.ip,
                    dominio: bodyServer.dominio,
                  },
                },
              },
            },
          },
        });
      }

      const newTask = prisma.servidores.update({
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

      taskCreated = await monitorQueue.addPing(newServidor);

      return { servidor: newServidor, task: newTask };
    });

    return data;
  } catch (error) {
    if (taskCreated != null && serverUpdated == false) monitorQueue.removePingRepeatable(taskCreated);
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
  });
  const taskPing = await PingServices.addServerPing(servidor);

  return { servidor, task: taskPing };
};

module.exports = ServidoresServices;
