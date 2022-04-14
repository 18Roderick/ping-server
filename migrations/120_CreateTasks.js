"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tasks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idTask: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true,
      },
      idServidor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Servidores",
          key: "idServidor",
        },
      },
      estatus: {
        type: Sequelize.ENUM("running", "stopped", "deleted"),
        defaultValue: "stopped",
      },
      fechaCreacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      fechaActualizacion: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    return; // await queryInterface.bulkInsert("Tasks", Tasks);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tasks");
  },
};
