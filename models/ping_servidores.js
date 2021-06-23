"use strict";
const { Model, literal} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PingServidores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PingServidores.init(
    {
      idPingServidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idServidor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Servidores",
          key: "idServidor",
        },
      },
      paquetesEnviados:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paquetesRecibidos:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paquetesPerdidos:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tiempoMinimoMs:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tiempoMaximoMs:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tiempoMedioMs:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fechaPing:{
        type: DataTypes.DATE,
        defaultValue: literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "PingServidores",
      timestamps: false,
    }
  );
  return PingServidores;
};
