'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SERVIDOREs', {
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
          model: "USUARIOS",
          key: "idUsuario",
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
      IP: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIP: true,
        },
      },
      fechaCreacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      fechaActualizacion: {
        type: "ON UPDATE CURRENT_TIMESTAMP",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SERVIDOREs');
  }
};