"user strict";
const { Usuarios, Servidores } = require("../models");
const { validationResult } = require("express-validator");

module.exports.getServidores = async (req, res, next) => {
  try {
    let datosToken = req.datosToken;

    let user = await Usuarios.findOne({
      where: { publicId: datosToken.id },
      attributes: [],
      include: [
        {
          model: Servidores,
          as: "servidores",
          attributes: ["dominio", "ip", "idServidor", "nombre"],
        },
      ],
    });

    res.json({
      data: user.servidores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un Error en buscando servidores",
    });
  }
};

module.exports.getServidoresByPage = async (req, res, next) => {
  try {
    let datosToken = req.datosToken;
    let { limit, offset } = req.query;

    limit = limit || 1;
    offset = offset || 20;
    let where = {};
    let servidores = await Servidores.findAll({
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

module.exports.crearServidor = async (req, res, next) => {
  try {
    let datosToken = req.datosToken;
    let { nombre, ip, dominio } = req.body;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let user = await Usuarios.findOne({
        where: { publicId: datosToken.id },
        atributes: ["nombre", "apellido"],
      });

      let servidor = await Servidores.create({
        idUsuario: user.idUsuario,
        nombre: nombre,
        ip: ip,
        dominio: dominio,
      });

      res.json({
        message: "Servidor Creado",
      });
    } else {
      res.status(400).json({
        message: "se Encontraron errores en los datos ingresados",
        errors: errors.array(),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un Error en creando el servidor",
    });
  }
};
module.exports.editarServidor = async (req, res, next) => {};

module.exports.borrarServidor = async (req, res, next) => {};
