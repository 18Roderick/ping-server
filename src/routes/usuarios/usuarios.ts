import { Router } from "express";

import validarCrearUsuario from "../../middlewares/validarCrearUsuario";
import validarLogin from "../../middlewares/validarLogin";
import * as usuarioController from "../../controllers/usuarios";

const router: Router = Router();

router.post("/usuario", validarCrearUsuario, usuarioController.crearUsuario);
router.post("/login", validarLogin, usuarioController.login);

export default router;
