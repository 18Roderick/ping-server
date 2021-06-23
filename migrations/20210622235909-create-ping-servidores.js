'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PING_SERVIDOREs', {
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
          model: "SERVIDORES",
          key: "idServidor",
        },
      },
      paquetesEnviados:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paquetesRecibidos:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paquetesPerdidos:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tiempoMinimoMs:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tiempoMaximoMs:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tiempoMedioMs:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fechaPing:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PING_SERVIDOREs');
  }
};