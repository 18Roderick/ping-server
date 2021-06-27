'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.Insert(
      "usuarios",
      require("../data/usuarioDefault.json")
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("usuarios", null, {});
  }
};
