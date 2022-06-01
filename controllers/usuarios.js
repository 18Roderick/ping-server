const createError = require("http-errors");
const { PrismaClient } = require("../prisma/generated/prisma-client-js");

const tokenCreator = require("../utils/token");

const cipher = require("../utils/cipher");

const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

module.exports.crearUsuario = async function (req, res) {
  try {
    const { nombre, apellido, email, password } = req.body;
    const errors = validationResult(req);
    let token = "";
    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        statusText: "bad request",
        message: "Se encontraron Errores en los datos ingresados",
        errors: errors.array(),
      });
    } else {
      const user = await prisma.usuarios.create({
        data: {
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: password,
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

module.exports.login = async function (req, res) {
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

    let user = await prisma.usuarios.findUnique({ where: { email } });

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
