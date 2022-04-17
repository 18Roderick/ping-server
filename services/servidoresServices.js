const { Op } = require("sequelize");
const Ajv = require("ajv");
const { UsuariosServidores, Usuarios, Servidores, Tasks, PingServidores, sequelize } = require("../models");

const PingServices = require("./pingServices");
const usuarios = require("../models/usuarios");

const ServidoresServices = {};

ServidoresServices.getServerDetail = async function (idServidor) {
  let servidores = await Servidores.findAll({
    where: { idServidor: idServidor },
    order: [["fechaCreacion", "DESC"]],
    attributes: { exclude: ["idUsuario"] },
    include: [
      {
        model: Tasks,
        as: "tasks",
      },
      {
        model: PingServidores,
        as: "pings",
        attributes: { exclude: ["idPingServidor", "idServidor"] },
        order: [["fechaPing", "DESC"]],
        limit: 1,
      },
    ],
  });

  return servidores;
};

ServidoresServices.getServers = async function (idUsuario) {
  let servidores = await Servidores.findAll({
    where: {},
    order: [["fechaCreacion", "DESC"]],
    attributes: { exclude: ["idUsuario"] },
    include: [
      {
        model: Usuarios,
        as: "usuario",
        where: { publicId: idUsuario },
        attributes: [],
      },
      {
        model: PingServidores,
        as: "pings",
        attributes: { exclude: ["idPingServidor", "idServidor"] },
        order: [["fechaPing", "DESC"]],
        limit: 1,
      },
    ],
  });

  return servidores;
};

ServidoresServices.createServer = async function (bodyServer) {
  const transaction = await sequelize.transaction();
  try {
    const errors = [];

    const usuario = await Usuarios.findOne({
      where: { idUsuario: bodyServer.idUsuario },
      // include: { model: Servidores, as: "servidor", where: { idUsuario: bodyServer.idUsuario } },
    });

    if (!usuario) return { errors: ["Usuario no encontrado"] };

    const servidor = await Servidores.findOne({
      where: {
        dominio: bodyServer.dominio,
      },
      include: { model: Usuarios, as: "usuario", where: { idUsuario: usuario.idUsuario } },
    });

    if (servidor) return { errors: ["Servidor ya existe"] };

    //si el servidor no existe entonces debe ser creado junto con su tarea

    const newServidor = await Servidores.create(
      {
        idUsuario: usuario.idUsuario,
        nombre: bodyServer.nombre,
        ip: bodyServer.ip,
        dominio: bodyServer.dominio,
        descripcion: bodyServer.descripcion ?? null,
      },
      { transaction }
    );

    const newTask = await PingServices.addServerPing(newServidor, transaction);

    await transaction.commit();
    return { servidor: newServidor, task: newTask };
    // return { servidor: {}, task: {} };
  } catch (error) {
    transaction.rollback();
    console.log(error);
    throw new Error(error);
  }
};

ServidoresServices.createUserServer = async function (bodyServer) {
  let servidor = await Servidores.create(
    {
      idUsuario: bodyServer.idUsuario,
      nombre: bodyServer.nombre,
      ip: bodyServer.ip,
      dominio: bodyServer.dominio,
    },
    {
      attributes: ["dominio", "ip", "idServidor", "nombre"],
    }
  );
  const taskPing = await PingServices.addServerPing(servidor);

  return { servidor, task: taskPing };
};

module.exports = ServidoresServices;
