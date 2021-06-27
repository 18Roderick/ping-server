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
    res.status(500).json({
      message: err.message,
    });
  }
};
