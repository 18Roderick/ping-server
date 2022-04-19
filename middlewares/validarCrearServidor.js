const { checkSchema } = require("express-validator");

const regexDominio = new RegExp("^([a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,}$");
const regexIP = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/gm;

module.exports = checkSchema({
  ip: {
    optional: { options: { nullable: true, checkFalsy: true } },
    isIP: {
      errorMessage: "El número ingresado no es una IP Valida",
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
        if (!regexDominio.test(value)) throw new Error("El dominio ingresado no es valido");

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
