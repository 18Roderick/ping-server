const { checkSchema } = require("express-validator");

const regexDominio =
  /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/gm;
const regexIP = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/gm;

module.exports = checkSchema({
  ip: {
    optional: { options: { nullable: true, checkFalsy: true } },
    isIP: {
      errorMessage: "El número ingresado no es una IP Valida",
    },
    trim: true,
  },
  descripcion: {
    optional: true,
    trim: true,
  },
  dominio: {
    trim: true,
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
    trim: true,
    isEmpty: {
      errorMessage: "Nombre Alias de servidor requerido",
      negated: true,
    },
  },
});
