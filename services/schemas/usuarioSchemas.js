const Joi = require("joi");

module.exports.updateUserSchema = Joi.object({
  nombre: Joi.string().optional(),
  apellido: Joi.string().optional(),
});

module.exports.updateUserAdminSchema = Joi.object({
  nombre: Joi.string().optional(),
  apellido: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  rol: Joi.string().optional(),
});
