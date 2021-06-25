const { Usuarios } = require("../models");

const tokenCreator = require("../utils/token");

module.exports.crearUsuario = async function (req, res) {
  try {
    const { nombre, apellido, email, password } = req.body;
    let token = "";
    const user = await Usuarios.create({
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
    });

    if (typeof user == "object") {
      token = tokenCreator.sign({
        nombre: user.nombre,
      });

      res.json({
        message: "Usuario Creado Con éxito",
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Creando Usuario",
    });
  }
};
