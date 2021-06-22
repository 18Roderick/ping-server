module.exports.error404 = function (req, res, next) {
  res.status(404).json({
    message: `La ruta ${req.url} no existe`,
  });
};

module.exports.catchError = function (error, req, res, next) {
  console.error(error.message);
  res.status(401).json({
    message: `Ocurrió un error en el servidor`,
  });
};
