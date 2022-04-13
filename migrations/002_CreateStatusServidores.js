"use strict";
const EstatusServidores = require("../data/estatusServidores.json");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("EstatusServidores", {
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

    await queryInterface.bulkInsert("EstatusServidores", EstatusServidores);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("EstatusServidores");
  },
};
