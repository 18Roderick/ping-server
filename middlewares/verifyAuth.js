const tokenJwt = require("../utils/token");

const tokenErrors = {
  JsonWebTokenError: "Token no valido",
  NotBeforeError: "NotBeforeError",
};

module.exports = async function (req, res, next) {
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
};
