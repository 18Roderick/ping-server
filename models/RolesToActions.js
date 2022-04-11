//ts-check
const sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RolesToActions extends Model {}

  RolesToActions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Roles", // Can be both a string representing the table name or a Sequelize model
          key: "Rol_RolToAction",
        },
      },
      idAction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Actions", // Can be both a string representing the table name or a Sequelize model
          key: "Actions_RolToAction",
        },
      },
    },
    {
      sequelize,
      modelName: "Roles",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return RolesToActions;
};
