const { Usuarios } = require("../models");

const tokenCreator = require("../utils/token");

const cipher = require("../utils/cipher");

const { validationResult } = require("express-validator");

module.exports.crearUsuario = async function (req, res) {
  try {
    console.log("llego");
    const { nombre, apellido, email, password } = req.body;
    const errors = validationResult(req);
    let token = "";
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Se encontraron Errores en los datos ingresados",
        errors: errors.array(),
      });
    } else {
      const user = await Usuarios.create({
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password,
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
    if (!errors.isEmpty()) {
      let cleanErrors = errors.array().map((d) => ({ msg: d.msg }));

      res.status(400).json({
        message: "Se encontraron Errores en los datos ingresados",
        errors: cleanErrors,
      });
    }

    let user = await Usuarios.findOne({ where: { email } });

    if (!(await cipher.compare(password, user.password)))
      res.status(401).json({
        message: "Acceso no Autorizado",
      });

    token = tokenCreator.sign({
      nombre: user.nombre,
      id: user.publicId,
    });

    res.status(200).json({
      message: "Éxito",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Creando Usuario",
    });
  }
};
