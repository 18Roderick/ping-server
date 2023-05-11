import * as Joi from "joi";

function validateEstatus(estatus, helpers) {
  console.log("Estatus: ", estatus);
  if (estatus === 1 || estatus === 2 || estatus === 3) return estatus;
  return helpers.message({ custom: "Invalid estatus" });
}

/** @function */
/** schema for server from clients */
/**
 * @param {Object} serverUpdateData
 * @property {number} idUsuario - id usuario
 * @property {number} idServidor - id id Servidor
 * @property {number} estatus - estatus for the server 1,2,3
 * @property {string} descripcion - brief description for the server
 * @property {string} nombre - name for the server
 */
export const updateServerSchema = Joi.object({
  idUsuario: Joi.number().required(),
  idServidor: Joi.number().required(),
  estatus: Joi.custom(validateEstatus, "estatus").optional(),
  descripcion: Joi.string().optional(),
  nombre: Joi.string().required(),
});
