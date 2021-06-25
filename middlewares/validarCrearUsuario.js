const { Usuarios } = require("../models");

const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

module.exports = async function (req, res, next) {
  try {
    let errors = [];
    console.log("Validando Usuario");
    //nombre y usuario no vacios
    // que el email sea valido y que  sea unico
    //que la contraseña sea minimo de 6 caracteres
    //verificar el numero de telefono en caso de que lo ingrese no es necesario
    const { nombre, apellido, email, password } = req.body;

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
    } else {
      //Validar que el usuario No exista
      let user = await Usuarios.findOne({
        where: { email: email },
        attributes: ["email"],
      });

      if (user != null) {
        errors.push({
          field: "email",
          message: "Ya existe un Usuario con este correo",
        });
      }
    }

    if (password == null || password.length <= 6) {
      errors.push({
        field: "password",
        message: "Debe Ingresar Una contraseña minima de 6 caracteres",
      });
    }

    if (errors.length > 0) {
      res.status(401).json({
        message: "Error Creando Usuario",
        errors,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error en middleware ${__filename}`);
    res.status(303).json({
      message: "Error al consultar usuario",
    });
  }
};
