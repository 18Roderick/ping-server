"use strict";
const cipher = require("../utils/cipher");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      let usuarios = require("../data/usuarioDefault.json");
      let size = usuarios.length;
      let i = 0;

      while (i < size) {
        usuarios[i] = {
          ...usuarios[i],
          publicId: Sequelize.literal("UUID()"),
          password: await cipher.encrypt(usuarios[i].password),
        };
        i++;
      }

      await queryInterface.bulkInsert("usuarios", usuarios);
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
