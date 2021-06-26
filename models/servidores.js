"use strict";
const { Model, literal,Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Servidores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Servidores.init(
    {
      idServidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "idUsuario",
        },
      },
      dominio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      IP: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIP: true,
        },
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      fechaActualizacion: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      modelName: "Servidores",
      timestamps: false,
    }
  );
  return Servidores;
};
