const { checkSchema } = require("express-validator");

const regexDominio = new RegExp("^([a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,}$");

module.exports = checkSchema({
  ip: {
    optional: {
      nullable: true,
      checkFalsy: true,
    },
    isIP: {
      errorMessage: "El numero ingresado no es una IP Valida",
    },
  },
  descripcion: {
    optional: true,
    trim: true,
  },
  dominio: {
    isEmpty: {
      errorMessage: "Dominio debe ingresar un dominio",
      negated: true,
      bail: true,
    },
    custom: {
      options: (value) => {
        if (regexDominio.test(value) == false) {
          throw new Error("El dominio ingresado no es valido");
        }
        return value;
      },
    },
  },
  nombre: {
    isEmpty: {
      errorMessage: "Nombre Alias de servidor requerido",
      negated: true,
    },
  },
});
