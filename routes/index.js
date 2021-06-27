const express = require("express");
const router = express.Router();
const verifyAuth = require('../middlewares/verifyAuth')
const usuarioRouter = require('./usuarios/usuarios')
const servidoresRouter = require('./servidores/servidores')

router.get("/", (req, res) => {
  res.json({
    msg: "Bienvenido a Pingdom Copy",
  });
});

router.use('/usuarios', usuarioRouter);
router.use('/servidores', servidoresRouter);
module.exports = router;
