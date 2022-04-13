const { Op } = require("sequelize");
const { Usuarios, Servidores, Tasks, PingServidores } = require("../models");

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
  console.log(bodyServer);
  const taskPing = await PingServices.addServerPing(servidor);

  return { servidor, task: taskPing };
};

module.exports = ServidoresServices;
