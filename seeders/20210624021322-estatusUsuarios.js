"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "estatusUsuarios",
      require("../data/estatusUsuarios.json")
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("estatusUsuarios", null, {});
  },
};
