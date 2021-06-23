'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ESTATUS_USUARIOs', {
      idEstatus: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ESTATUS_USUARIOs');
  }
};