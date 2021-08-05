const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const usuarioRouter = require("./usuarios/usuarios");
const servidoresRouter = require("./servidores/servidores");

router.get("/", (req, res) => {
  res.render("index", {
    titulo: "Inicio",
  });
});

router.use("/usuarios", usuarioRouter);
router.use("/servidores", servidoresRouter);
module.exports = router;
