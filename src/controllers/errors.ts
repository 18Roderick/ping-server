export const error404 = function (req, res) {
  res.status(404).json({
    message: `La ruta ${req.url} no existe`,
  });
};

export const catchError = function (error, req, res) {
  console.error(error.message);
  res.status(401).json({
    message: "Ocurrió un error en el servidor",
  });
};
