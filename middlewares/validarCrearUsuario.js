const { Usuarios } = require("../models");
const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  password: {
    isStrongPassword: {
      errorMessage:
        "La contraseña debe tener mínimo 7 caracteres con letras mayúsculas/minúsculas y al menos 1 número y 1 carácter especial",
      options: {
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      },
    },
  },
  nombre: {
    isEmpty: {
      negated: true,
      errorMessage: "Nombre del usuario es requerido",
    },
  },
  apellido: {
    isEmpty: {
      negated: true,
      errorMessage: "Apellido del usuario es requerido",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Email ingresado no es valido",
      bail: true,
    },
    normalizeEmail: true,
    custom: {
      options: (value) => {
        return Usuarios.findOne({
          where: { email: value },
        }).then((user) => {
          if (user) {
            return Promise.reject("El email ingresado ya esta en uso");
          }
        });
      },
    },
  },
});
