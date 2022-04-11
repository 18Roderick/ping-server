//ts-check
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Actions extends Model {}

  return Actions;
};
