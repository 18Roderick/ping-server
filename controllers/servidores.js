"user strict";
const { Usuarios, Servidores } = require("../models");
const { validationResult } = require("express-validator");

module.exports.getServidores = async (req, res) => {
  try {
    let datosToken = req.datosToken;

    let servidores = await Servidores.findAll({
      where: {},
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

    console.log("Buscando Servidores");

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
    let { nombre, ip, dominio } = req.body;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let user = await Usuarios.findOne({
        where: { publicId: datosToken.id },
        atributes: ["nombre", "apellido"],
      });

      let servidor = await Servidores.create(
        {
          idUsuario: user.idUsuario,
          nombre: nombre,
          ip: ip,
          dominio: dominio,
        },
        {
          attributes: ["dominio", "ip", "idServidor", "nombre"],
        }
      );

      console.log("Nuevo Servidor Agregado ", user.nombre);

      res.json({
        message: "Servidor Agregado",
        servidor: {
          nombre: servidor.nombre,
          ip: servidor.ip,
          dominio: servidor.dominio,
          estatus: servidor.estatus,
          idServidor: servidor.idServidor,
        },
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
