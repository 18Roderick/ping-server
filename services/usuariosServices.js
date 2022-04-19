const { Op } = require("sequelize");
const Ajv = require("ajv");
const { UsuariosServidores, Usuarios, Servidores, Tasks, PingServidores, sequelize } = require("../models");

const UsuariosServices = {};

UsuariosServices.findUsuarioById = async function (id) {
  search = {};
  if (!isNaN(id)) search.idUsuario = id;
  else search.publicId = id;
  return await Usuarios.findOne({
    where: { ...search },
  });
};

module.exports = UsuariosServices;
