const express = require("express");
const router = express.Router();
const verifyAuth = require('../middlewares/verifyAuth')
const usuarioRouter = require('./usuarios/usuarios')

router.get("/", (req, res) => {
  res.json({
    msg: "Bienvenido a Pingdom Copy",
  });
});

router.use('/usuarios', usuarioRouter);
module.exports = router;
