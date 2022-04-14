"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Servidores", {
      publicId: {
        type: Sequelize.UUID,
        defaultType: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      idServidor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "UsuariosServidores",
          key: "idUsuario",
        },
      },
      estatus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "EstatusServidores", // Can be both a string representing the table name or a Sequelize model
          key: "tipo",
        },
      },
      dominio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIP: true,
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
    await queryInterface.dropTable("Servidores");
  },
};
