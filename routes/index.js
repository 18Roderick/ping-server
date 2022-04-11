const express = require("express");
const router = express.Router();
//const verifyAuth = require("../middlewares/verifyAuth");
const usuarioRouter = require("./usuarios/usuarios");
const servidoresRouter = require("./servidores/servidores");

router.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

router.get("/ping", (_req, res) => {
  res.status(200).send("pong");
});

router.use("/usuarios", usuarioRouter);
router.use("/servidores", servidoresRouter);
module.exports = router;
