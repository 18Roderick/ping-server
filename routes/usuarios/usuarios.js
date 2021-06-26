const express = require("express");
const router = express.Router();
const verifyAuth = require("../../middlewares/verifyAuth");
const validarCrearUsuario = require("../../middlewares/validarCrearUsuario");
const validarLogin = require("../../middlewares/validarLogin");
const usuarioController = require("../../controllers/usuarios");

router.post("/usuario", validarCrearUsuario, usuarioController.crearUsuario);
router.post("/login", validarLogin, usuarioController.login);

module.exports = router;
