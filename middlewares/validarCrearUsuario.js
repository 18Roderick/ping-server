const { Usuarios } = require("../models");

module.exports = async function (req, res, next) {
  try {
    let errors = [];

    //nombre y usuario no vacios
    // que el email sea valido y que  sea unico
    //que la contraseña sea minimo de 6 caracteres
    //verificar el numero de telefono en caso de que lo ingrese no es necesario
  } catch (error) {
    console.log(`Error en middleware ${__filename}`);
    res.status(303).json({
      message: "Error al consultar usuario",
    });
  }
};
