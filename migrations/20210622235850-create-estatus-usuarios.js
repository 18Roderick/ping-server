"use strict";
const EstatusUsuarios = require("../data/estatusUsuarios.json");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("estatusUsuarios", {
      idEstatus: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

    await queryInterface.bulkInsert("estatusUsuarios", EstatusUsuarios);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("estatusUsuarios");
  },
};
