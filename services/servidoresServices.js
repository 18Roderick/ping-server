const { Op } = require("sequelize");
const Ajv = require("ajv");
const { UsuariosServidores, Usuarios, Servidores, Tasks, PingServidores, sequelize } = require("../models");

const PingServices = require("./pingServices");
const usuarios = require("../models/usuarios");

const ServidoresServices = {};

ServidoresServices.getServers = async function (idUsuario) {
  const today = new Date();
  const dateToday = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const usuario = await Usuarios.findOne({
    where: { publicId: idUsuario },
  });

  let servidores = await Servidores.findAll({
    where: {},
    order: [["fechaCreacion", "ASC"]],
    attributes: ["idServidor", "nombre", "descripcion", "fechaCreacion"],

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
    const usuario = await Usuarios.findOne({
      where: { idUsuario: bodyServer.idUsuario },
    });

    // console.log(usuario);

    if (!usuario) throw new Error("Usuario no encontrado");

    const servidor = await Servidores.findOne({
      where: {
        dominio: bodyServer.dominio,
      },
    });

    const usuarioServidor = servidor
      ? await UsuariosServidores.findOne({
          where: { idUsuario: usuario.idUsuario, idServidor: servidor.idServidor },
        })
      : null;

    if (servidor && usuarioServidor) throw new Error("Usuario ya tiene este servidor");

    //inicializar variables
    let newServidor = servidor;
    let newTask = null;

    //si el servidor no existe entonces debe ser creado junto con su tarea
    if (!servidor) {
      newServidor = await Servidores.create(
        {
          dominio: bodyServer.dominio,
          descripcion: bodyServer.descripcion ?? null,
        },
        { transaction }
      );

      await newServidor.addUsuario(usuario, {
        through: { nombre: bodyServer.nombre, ip: bodyServer.ip },
        transaction,
      });

      newTask = await PingServices.addServerPing(newServidor, transaction);
    }

    if (servidor && !usuarioServidor) {
      //si el servidor existe entonces, solo crear l asociación a la tabla de servidores
      console.log("Creando asociación a servidor existente");
      // await UsuariosServidores.create(
      //   { idServidor: newServidor.idServidor, idUsuario: usuario.idUsuario },
      //   { transaction }
      // );
      await newServidor.addUsuario(usuario, {
        through: { nombre: bodyServer.nombre, ip: bodyServer.ip },
        transaction,
      });
      newTask = await Tasks.findOne({ where: { idServidor: newServidor.idServidor } }, { transaction });
    }

    await transaction.commit();
    return { servidor: newServidor, task: newTask };
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
