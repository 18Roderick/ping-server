"use strict";
const { Model, literal, Sequelize } = require("sequelize");

const cipher = require("../utils/cipher");

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Servidores, {
        foreignKey: "idServidor",
        as: "servidores",
      });
    }
  }
  Usuarios.init(
    {
      publicId: {
        type: DataTypes.UUID,
        defaultType: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      estatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "EstatusUsuarios", // Can be both a string representing the table name or a Sequelize model
          key: "tipo",
        },
        defaultValue: 1,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ingrese su Apellido",
          },
        },
      },
      apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ingrese su Apellido",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: "El email ingresado no es valido",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ingrese su Contraseña",
          },
        },
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      fechaActualizacion: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
      },
    },
    {
      sequelize,
      modelName: "Usuarios",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );

  //Agregando Hooks

  Usuarios.beforeCreate((user, options) => {
    return cipher.encrypt(user.password).then((hashedPw) => {
      user.password = hashedPw;
    });
  });

  Usuarios.afterUpdate((user, options) => {
    user.changed("fechaActualizacion", true);
  });

  return Usuarios;
};
