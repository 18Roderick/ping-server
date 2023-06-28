import { Router } from "express";

import verifyAuth from "../../middlewares/verifyAuth";

import validarCrearServidor from "../../middlewares/validarCrearServidor";
import * as servidoresController from "../../controllers/servidores";

const router: Router = Router();

router.use(verifyAuth);

router.get("/", servidoresController.getServidores);
router.get("/:id", servidoresController.getServidores);
router.get("/page", servidoresController.getServidoresByPage);
router.post("/", validarCrearServidor, servidoresController.crearServidor);
router.put("/", servidoresController.editarServidor);
router.delete("/", servidoresController.borrarServidor);

export default router;
