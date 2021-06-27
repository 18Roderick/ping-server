const router = require("express").Router();

const verifyAuth = require("../../middlewares/verifyAuth");

const servidoresController = require("../../controllers/servidores");

router.use(verifyAuth);

router.get("/", servidoresController.getServidores);
router.get("/page/:page/:cantidad", servidoresController.getServidoresByPage);
router.post("/", servidoresController.crearServidor);
router.put("/", servidoresController.editarServidor);
router.delete("/", servidoresController.borrarServidor);

module.exports = router;
