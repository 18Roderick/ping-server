const tokenJwt = require("../utils/token");
module.exports = async function (req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      let token = bearerHeader.split(" ")[1];

      let datosToken = await tokenJwt.verify(token);

      req.datosToken = datosToken;
      next();
    } else {
      res.status(403).json({
        message: "Acceso no Autorizado",
      });
    }
  } catch (err) {
    console.log(err);
    const status = err.message == "jwt expired" ? 403 : 500;
    const message =
      err.message == "jwt expired"
        ? "Token ha expirado debe volver a iniciar sesión"
        : "Error Validando usuario";
    res.status(status).json({
      message,
    });
  }
};
