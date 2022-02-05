"use strict";

module.exports = {
  up: async (queryInterface) => {
    try {
      await queryInterface.bulkInsert("EstatusUsuarios", require("../data/estatusUsuarios.json"));
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("EstatusUsuarios", null, {});
  },
};
