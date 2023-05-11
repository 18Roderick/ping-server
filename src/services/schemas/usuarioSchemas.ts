import * as Joi from "joi";

export const updateUserSchema = Joi.object({
  nombre: Joi.string().optional(),
  apellido: Joi.string().optional(),
});

export const updateUserAdminSchema = Joi.object({
  nombre: Joi.string().optional(),
  apellido: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  rol: Joi.string().optional(),
});
