'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "estatusServidores",
      require("../data/estatusServidores.json")
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("estatusServidores", null, {});
  }
};
