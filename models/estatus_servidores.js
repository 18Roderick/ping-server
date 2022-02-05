"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EstatusServidores extends Model {}
  EstatusServidores.init(
    {
      idEstatus: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "EstatusServidores",
      timestamps: false,
    }
  );

  return EstatusServidores;
};
