const { Usuarios, Servidores } = require("../models");

module.exports.getServidores = async (req, res, next) => {};

module.exports.getServidoresByPage = async (req, res, next) => {};

module.exports.crearServidor = async (req, res, next) => {
  try {
    let datosToken = req.datosToken;
    let user = await Usuarios.findOne({
      where: { publicId: datosToken.id },
      atributes: ["nombre", "apellido"],
   /*    include: [
        {
          model: Servidores,
          as: "servidor"
        },
      ], */
    });

    let servidores = await user.getServidores({});
    console.log(user);
    res.json({
      data: servidores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un Erro en buscando servidores",
    });
  }
};
module.exports.editarServidor = async (req, res, next) => {};

module.exports.borrarServidor = async (req, res, next) => {};
