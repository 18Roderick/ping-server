const { Op } = require("sequelize");
const Ajv = require("ajv");
const { UsuariosServidores, Usuarios, Servidores, Tasks, PingServidores, sequelize } = require("../models");

const PingServices = require("./pingServices");

const ServidoresServices = {};

ServidoresServices.getServers = async function (idUsuario) {
  const today = new Date();
  const dateToday = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  let servidores = await Servidores.findAll({
    where: {},
    order: [["fechaCreacion", "ASC"]],
    attributes: ["dominio", "ip", "idServidor", "nombre"],
    include: [
      {
        model: Usuarios,
        as: "usuario",
        where: { publicId: idUsuario },
        attributes: [],
      },
      {
        model: Tasks,
        as: "tasks",
      },
      {
        model: PingServidores,
        as: "pings",
        attributes: { exclude: ["idPingServidor", "idServidor"] },
        // where: { fechaPing: { [Op.gte]: new Date(dateToday) } },
        order: [["fechaPing", "ASC"]],
        limit: 1,
      },
    ],
  });

  return servidores;
};

ServidoresServices.createServer = async function (bodyServer) {
  const transaction = await sequelize.transaction();
  try {
    const usuario = await Usuarios.findOne(
      {
        where: { idUsuario: bodyServer.idUsuario },
      },
      { include: Servidores }
    );

    console.log(usuario);

    if (!usuario) throw new Error("Usuario no encontrado");

    const existServer = await Servidores.findOne(
      { where: { dominio: bodyServer.dominio } },
      {
        include: [{ model: Usuarios, as: "usuario", where: { idUsuario: bodyServer.idUsuario } }],
      }
    );

    console.log(usuario, existServer);

    if (existServer) throw new Error("El servidor existe");

    let servidor = await Servidores.create(
      {
        nombre: bodyServer.nombre,
        ip: bodyServer.ip,
        dominio: bodyServer.dominio,
      },
      { transaction: transaction }
    );

    console.log(servidor, usuario.createServidores);

    const usuarioServidor = await servidor.addUsuario(usuario, { transaction: transaction });

    console.log("Se Ha Creado un Nuevo Servidor ", usuarioServidor);

    // const taskPing = await PingServices.addServerPing(servidor, transaction);
    // console.log("Tarea de Ping Creada");
    await transaction.commit();
    return; //{ servidor, task: taskPing };
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
