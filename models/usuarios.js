"use strict";
const { Model } = require("sequelize");

const cipher = require("../utils/cipher");

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associations(models) {
      this.belongsToMany(models.Servidores, {
        foreignKey: "idServidor",
        otherKey: "idUsuario",
        as: "servidores",
        through: models.UsuariosServidores,
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

  Usuarios.beforeCreate((user) => {
    return cipher.encrypt(user.password).then((hashedPw) => {
      user.password = hashedPw;
    });
  });

  Usuarios.beforeUpdate((user) => {
    user.fechaActualizacion = Date.now();
  });

  return Usuarios;
};
