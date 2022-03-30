"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Servidores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuarios, {
        as: "usuario",
        foreignKey: "idUsuario",
        onDelete: "NO ACTION",
      });

      this.hasMany(models.PingServidores, {
        as: "pings",
        foreignKey: "idServidor",
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
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      fechaActualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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

  Servidores.beforeCreate((servidor) => {
    //Numero default de estatus del servidor
    servidor.estatus = 1;
  });

  Servidores.beforeUpdate((servidor) => {
    servidor.fechaActualizacion = DataTypes.NOW;
  });

  return Servidores;
};
