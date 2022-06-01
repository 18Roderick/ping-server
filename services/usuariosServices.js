const { Op } = require("sequelize");
const Ajv = require("ajv");

const { PrismaClient } = require("../prisma/generated/prisma-client-js");

const prisma = new PrismaClient();

const UsuariosServices = {};

UsuariosServices.findUsuarioById = async function (id) {
  search = {};
  if (!isNaN(id)) search.idUsuario = id;
  else search.publicId = id;
  return prisma.usuarios.findUnique({
    where: { ...search },
  });
};

module.exports = UsuariosServices;
