import { v4 as uuid } from "uuid";

import { PrismaClient, TasksEstatus, TasksTypes, Prisma } from "@prisma/client";

import { makePing } from "../utils/pingServer";

import * as PingServices from "./pingServices";

import * as monitorQueue from "../tasks/monitorQueue";

import { updateServerSchema } from "./schemas";

const prisma = new PrismaClient();

const ServidoresServices = {};

const ESTATUS_SERVIDORES = {
  ACTIVO: 1,
  VALIDADO: 2,
  DESACTIVADO: 3,
};

export const getServerDetail = async function (idServidor) {
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

export const getServers = async function (id) {
  const search = {} as Prisma.UsuariosWhereInput;
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

export const createServer = async function (bodyServer) {
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

export const createUserServer = async function (bodyServer) {
  let servidor = await prisma.usuarios.update({
    where: {
      idUsuario: bodyServer.idUsuario,
    },
    data: {
      Servidores: {
        create: {
          ip: bodyServer.ip,
          dominio: bodyServer.dominio,
          nombre: bodyServer.nombre,
          descripcion: bodyServer.descripcion,
          estatus: ESTATUS_SERVIDORES.ACTIVO,
        },
      },
    },
    include: {
      Servidores: {
        where: {
          ip: bodyServer.ip,
        },
      },
    },
  });
  const taskPing = await PingServices.addServerPing(servidor.Servidores[0]);

  return { servidor, task: taskPing };
};

//update server
export const updateServer = async function (body) {
  return prisma.servidores.update({
    where: { idServidor: body.idServidor },
    data: {
      estatus: body.estatus,
      descripcion: body.descripcion,
      nombre: body.nombre,
    },
  });
};
