import { NextFunction, Request, Response } from "express";

import * as tokenJwt from "../utils/token";

const tokenErrors = {
  JsonWebTokenError: "Token no valido",
  NotBeforeError: "NotBeforeError",
};

export interface AuthRequest extends Request {
  datosToken: unknown;
}

export default async function (req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader === "undefined")
      return res.status(403).json({
        message: "Acceso no Autorizado",
      });

    let token = bearerHeader.split(" ")[1];

    let datosToken = await tokenJwt.verify(token);

    req.datosToken = datosToken;

    next();
  } catch (err) {
    console.log(err.name);

    let status = err?.name == "jwt expired" ? 403 : 401;
    if (!tokenErrors[err.name]) status = 403;

    const message =
      err.message == "jwt expired" ? "Token ha expirado debe volver a iniciar sesión" : "Token No Valido";
    res.status(status).json({
      message,
    });
  }
}
