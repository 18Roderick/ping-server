import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ESTATUS_USUARIOS = {
	ACTIVO: 1,
	VALIDADO: 2,
	DESACTIVADO: 3,
};

export const findUsuarioById = async function (id) {
	const search = {} as Prisma.UsuariosWhereUniqueInput;
	if (!isNaN(id)) search.idUsuario = id;
	else search.publicId = id;
	console.log(search);
	return prisma.usuarios.findUnique({
		where: { ...search },
	});
};

export const createUsuario = async () => {};
