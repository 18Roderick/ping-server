"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		try {
			await queryInterface.bulkInsert("EstatusUsuarios", require("../data/estatusUsuarios.json"));
		} catch (error) {
			console.error(error);
		}
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("EstatusUsuarios", null, {});
	},
};
