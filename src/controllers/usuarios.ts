import httpErrors from "http-errors";
import { v4 as uuid } from "uuid";
import { EstatusUsuario, PrismaClient } from "@prisma/client";

const tokenCreator = require("../utils/token");

import * as cipher from "../utils/cipher";

import { validationResult } from "express-validator";

const prisma = new PrismaClient();

export const crearUsuario = async function (req, res) {
	try {
		const { nombre, apellido, email, password } = req.body;
		const errors = validationResult(req);
		let token = "";
		if (!errors.isEmpty()) {
			return res.status(400).json({
				statusCode: 400,
				message: "Se encontraron Errores en los datos ingresados",
				errors: errors.array(),
			});
		} else {
			const user = await prisma.usuarios.create({
				data: {
					publicId: uuid(),
					nombre: nombre,
					apellido: apellido,
					estatus: EstatusUsuario.ACTIVE,
					email: email,
					password: await cipher.encrypt(password),
				},
			});

			if (typeof user == "object") {
				token = tokenCreator.sign({
					nombre: user.nombre,
					id: user.publicId,
				});

				res.json({
					message: "Usuario Creado Con éxito",
					token: token,
				});
			}
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error Creando Usuario",
		});
	}
};

export const login = async function (req, res) {
	try {
		const { email, password } = req.body;
		const errors = validationResult(req);
		let token = "";
		console.log("paso Validación");
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: "Email o Contraseña no Valido",
			});
		}

		let user = await prisma.usuarios.findUnique({
			where: { email },
		});

		if (!user || !(await cipher.compare(password, user.password))) {
			return res.status(401).json({
				message: "Acceso no Autorizado",
			});
		}

		token = tokenCreator.sign({
			nombre: user.nombre,
			id: user.publicId,
		});

		return res.status(200).json({
			message: "Éxito",
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Error Login",
		});
	}
};
