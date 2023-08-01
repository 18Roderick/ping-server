import { Router } from "express";

import usuarioRouter from "./usuarios/usuarios";

import servidoresRouter from "./servidores/servidores";

const router: Router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ message: "OK" });
});

router.get("/ping", (_req, res) => {
	res.status(200).send("pong");
});

router.use("/usuarios", usuarioRouter);
router.use("/servidores", servidoresRouter);

export default router;
