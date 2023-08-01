import { PrismaClient } from "@prisma/client";
import { checkSchema } from "express-validator";

const prisma = new PrismaClient();

import * as cipher from "../utils/cipher";

export default checkSchema({
	password: {
		isEmpty: {
			errorMessage: "Debe Colocar su contraseña",
			negated: true,
		},
	},
	email: {
		isEmail: {
			errorMessage: "Correo No Valido",
			bail: true,
		},
		normalizeEmail: true,
		custom: {
			options: async (value, { req }) => {
				try {
					let user = await prisma.usuarios.findFirst({
						where: { email: value },
					});

					if (!user) {
						return Promise.reject("El email ingresado No Existe");
					} else {
						let result = await cipher.compare(req.body.password, user.password);

						if (!result) {
							return Promise.reject("Correo o Contraseña no coinciden");
						}
					}
				} catch (error) {
					return error;
				}
			},
		},
	},
});
