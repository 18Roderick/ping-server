"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Usuarios", {
      publicId: {
        type: Sequelize.UUID,
        defaultType: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      estatus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "EstatusUsuarios", // Can be both a string representing the table name or a Sequelize model
          key: "tipo",
        },
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ingrese su Apellido",
          },
        },
      },
      apellido: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ingrese su Apellido",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: "El email ingresado no es valido",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ingrese su Contraseña",
          },
        },
      },
      fechaCreacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      fechaActualizacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Usuarios");
  },
};
