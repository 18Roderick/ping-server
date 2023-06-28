import { PrismaClient } from "@prisma/client";
import { checkSchema } from "express-validator";

const prisma = new PrismaClient();

export default checkSchema({
  password: {
    isStrongPassword: {
      errorMessage:
        "La contraseña debe tener mínimo 6 caracteres con letras mayúsculas/minúsculas y al menos 1 número y 1 carácter especial",
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      },
    },
    trim: true,
  },
  nombre: {
    isEmpty: {
      negated: true,
      errorMessage: "Nombre del usuario es requerido",
    },
    trim: true,
  },
  apellido: {
    isEmpty: {
      negated: true,
      errorMessage: "Apellido del usuario es requerido",
    },
    trim: true,
  },
  email: {
    trim: true,
    isEmail: {
      errorMessage: "Email ingresado no es valido",
      bail: true,
    },
    normalizeEmail: true,
    custom: {
      options: (value) => {
        return prisma.usuarios
          .findFirst({
            where: { email: value },
          })
          .then((user) => {
            if (user) {
              return Promise.reject("El email ingresado ya esta en uso");
            }
          });
      },
    },
  },
});
