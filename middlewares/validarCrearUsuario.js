const { Usuarios } = require("../models");

const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

module.exports = async function (req, res, next) {
  try {
    let errors = [];

    //nombre y usuario no vacios
    // que el email sea valido y que  sea unico
    //que la contraseña sea minimo de 6 caracteres
    //verificar el numero de telefono en caso de que lo ingrese no es necesario
    const { nombre, apellido, email } = req.body;
    
    if (!apellido) {
      errors.push({
        field: "apellido",
        message: "Apellido es un campo obligatorio",
      });
    }
    
    if (!nombre) {
      errors.push({
        field: "nombre",
        message: "nombre es un campo obligatorio",
      });
    }


    if (!regexEmail.test(email)) {
      errors.push({
        field: "email",
        message: "Correo ingresado no es valido",
      });
    }else{


    }


  } catch (error) {
    console.log(`Error en middleware ${__filename}`);
    res.status(303).json({
      message: "Error al consultar usuario",
    });
  }
};
