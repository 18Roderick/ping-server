"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PingServidores", {
      idPingServidor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idServidor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Servidores",
          key: "idServidor",
        },
      },
      times: {
        type: Sequelize.FLOAT,
      },
      packetLoss: {
        type: Sequelize.FLOAT,
      },
      min: {
        type: Sequelize.FLOAT,
      },
      max: {
        type: Sequelize.FLOAT,
      },
      avg: {
        type: Sequelize.FLOAT,
      },
      log: {
        type: Sequelize.TEXT,
      },
      isAlive: {
        type: Sequelize.BOOLEAN,
      },
      numericHost: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fechaPing: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    // await queryInterface.bulkInsert("PingServidores", PingServidores);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PingServidores");
  },
};
