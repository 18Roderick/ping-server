import { PrismaClient } from "@prisma/client";

import * as ServidoresServices from "../services/servidoresServices";

import * as UsuariosServices from "../services/usuariosServices";

import { validationResult } from "express-validator";

const prisma = new PrismaClient();

export const getServidores = async (req, res) => {
  try {
    let datosToken = req.datosToken;
    const usuario = await UsuariosServices.findUsuarioById(datosToken.id);

    if (!usuario) return res.status(403).json({ message: "Sin acceso" });

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

export const getServidoresByPage = async (req, res) => {
  try {
    let datosToken = req.datosToken;
    let { limit, offset } = req.query;

    limit = parseInt(limit || 1);
    offset = parseInt(offset || 20);

    let where = {};

    let servidores = await prisma.servidores.findMany({ where });

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

export const crearServidor = async (req, res) => {
  try {
    let datosToken = req.datosToken;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let user = await prisma.usuarios.findFirst({
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
export const editarServidor = async (req, res) => {};

export const borrarServidor = async (req, res) => {};
