"user strict";
const { Usuarios, Servidores, Tasks, PingServidores } = require("../models");

const ServidoresServices = require("../services/servidoresServices");
const UsuariosServices = require("../services/usuariosServices");
const { validationResult } = require("express-validator");
const { json } = require("sequelize/types");

module.exports.getServidores = async (req, res) => {
  try {
    let datosToken = req.datosToken;
    const usuario = await UsuariosServices.findUsuarioById(datosToken.id);

    if (!usuario) return json.status(403).json({ message: "Sin acceso" });

    let servidores = await ServidoresServices.getServers(datosToken.id);
    res.json({
      data: servidores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un Error en buscando servidores",
    });
  }
};

module.exports.getServidoresByPage = async (req, res) => {
  try {
    let datosToken = req.datosToken;
    let { limit, offset } = req.query;

    limit = parseInt(limit || 1);
    offset = parseInt(offset || 20);

    let where = {};

    let servidores = await Servidores.findAndCountAll({
      limit,
      offset,
      where: where,
      attributes: ["dominio", "ip", "idServidor", "nombre"],
      include: [
        {
          model: Usuarios,
          as: "usuario",
          where: { publicId: datosToken.id },
          attributes: [],
        },
      ],
    });

    res.json({
      data: servidores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un Error en buscando servidores",
    });
  }
};

module.exports.crearServidor = async (req, res) => {
  try {
    let datosToken = req.datosToken;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let user = await Usuarios.findOne({
        where: { publicId: datosToken.id },
      });

      const data = await ServidoresServices.createServer({ idUsuario: user.idUsuario, ...req.body });
      console.log(data);
      if (data?.errors) {
        return res.status(400).json({
          ...data,
        });
      }

      return res.json({
        message: "Servidor Agregado",
        data,
      });
    } else {
      res.status(400).json({
        message: "se Encontraron errores en los datos ingresados",
        errors: errors.array(),
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Ocurrió un Error en creando el servidor",
    });
  }
};
module.exports.editarServidor = async (req, res) => {};

module.exports.borrarServidor = async (req, res) => {};
