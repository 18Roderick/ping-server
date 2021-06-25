const express = require("express");
const router = express.Router();
const verifyAuth = require("../../middlewares/verifyAuth");
const validarCrearUsuario = require("../../middlewares/validarCrearUsuario");
const usuarioController = require("../../controllers/usuarios");

router.post("/usuario", validarCrearUsuario, usuarioController.crearUsuario);

module.exports = router;
