//ts-check
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UsuariosServidores extends Model {}
  UsuariosServidores.init(
    {
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios", // Can be both a string representing the table name or a Sequelize model
          key: "id",
        },
      },
      idServidor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Servidores", // Can be both a string representing the table name or a Sequelize model
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UsuariosServidores",
    }
  );

  return UsuariosServidores;
};
