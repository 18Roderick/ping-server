"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("EstatusServidores", require("../data/estatusServidores.json"));
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("EstatusServidores", null, {});
  },
};
