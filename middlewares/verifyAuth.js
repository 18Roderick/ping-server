const tokenJwt = require("../utils/token");
module.exports = async function (req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      let token = bearerHeader.split(" ")[1];

      await tokenJwt.verify(token);
      req.token = token;
      next();
    } else {
      res.status(403).json({
        message: "Acceso no Autorizado",
      });
    }
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};
