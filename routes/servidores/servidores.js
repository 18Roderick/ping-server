const router = require("express").Router();

const verifyAuth = require("../../middlewares/verifyAuth");

const validarCrearServidor = require("../../middlewares/validarCrearServidor");

const servidoresController = require("../../controllers/servidores");

router.use(verifyAuth);

router.get("/", servidoresController.getServidores);
router.get("/:id", servidoresController.getServidores);
router.get("/page", servidoresController.getServidoresByPage);
router.post("/", validarCrearServidor, servidoresController.crearServidor);
router.put("/", servidoresController.editarServidor);
router.delete("/", servidoresController.borrarServidor);

module.exports = router;
