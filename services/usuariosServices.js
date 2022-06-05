const { PrismaClient } = require("../prisma/generated/prisma-client-js");

const prisma = new PrismaClient();

const UsuariosServices = {};

const ESTATUS_USUARIOS = {
  ACTIVO: 1,
  VALIDADO: 2,
  DESACTIVADO: 3,
};

UsuariosServices.findUsuarioById = async function (id) {
  const search = {};
  if (!isNaN(id)) search.idUsuario = id;
  else search.publicId = id;
  console.log(search);
  return prisma.usuarios.findUnique({
    where: { ...search },
  });
};

UsuariosServices.createUsuario = async () => {};

module.exports = UsuariosServices;
