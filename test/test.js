const { PrismaClient } = require("../prisma/generated/prisma-client-js");

async function test() {
  const prisma = new PrismaClient();

  try {
    // const estatus = await prisma.estatusServidores.findMany();
    // console.log(estatus);
    const data = await prisma.$transaction(async (prisma) => {
      return await prisma.$queryRaw`select u.nombre, S.dominio, DS.nombre, DS.descripcion 
      from Usuarios as u
      left join UsuariosServidores US on u.idUsuario = US.idUsuario
      left join Servidores S on US.idServidor = S.idServidor
      left join DetallesServidor DS on US.idDetalleServidor = DS.id`;
    });

    console.log(data);
  } finally {
    await prisma.$disconnect();
  }
}

test();
