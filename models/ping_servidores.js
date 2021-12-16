"use strict";
const { Model, literal, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PingServidores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Servidores, {
        foreignKey: "idServidor",
        as: "servidor",
      });
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
      times: {
        type: DataTypes.FLOAT,
      },
      packagesReceived: {
        type: DataTypes.FLOAT,
      },
      packetLoss: {
        type: DataTypes.FLOAT,
      },
      min: {
        type: DataTypes.FLOAT,
      },
      max: {
        type: DataTypes.FLOAT,
      },
      avg: {
        type: DataTypes.FLOAT,
      },
      log: {
        type: DataTypes.TEXT,
      },
      isAlive: {
        type: DataTypes.BOOLEAN,
      },
      fechaPing: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW ,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PingServidores",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return PingServidores;
};
