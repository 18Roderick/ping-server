"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UsuariosServidores", {
      idServidor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Servidores", // Can be both a string representing the table name or a Sequelize model
          key: "idServidor",
        },
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios", // Can be both a string representing the table name or a Sequelize model
          key: "idUsuario",
        },
      },
    });

    // await queryInterface.bulkInsert("UsuariosServidores", UsuariosServidores);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UsuariosServidores");
  },
};
