"use strict";
const { Model, literal, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Servidores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuarios, {
        foreignKey: "idUsuario",
        as: "usuario",
        onDelete: "NO ACTION",
      });
    }
  }
  Servidores.init(
    {
      publicId: {
        type: DataTypes.UUID,
        defaultType: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      idServidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      estatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "EstatusServidores", // Can be both a string representing the table name or a Sequelize model
          key: "tipo",
        },
        defaultValue: 1,
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
      ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
        allowNull: false,
      },
      fechaActualizacion: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
      },
    },
    {
      sequelize,
      modelName: "Servidores",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["publicId"],
        },
      ],
    }
  );

  Servidores.beforeCreate((servidor, options) => {
    //Numero default de estatus del servidor
    servidor.estatus = 1;
  });

  return Servidores;
};
