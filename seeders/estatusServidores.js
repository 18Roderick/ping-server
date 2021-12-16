"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("EstatusServidores", require("../data/estatusServidores.json"));
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("EstatusServidores", null, {});
	},
};
