//ts-check
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {}

  Tasks.init(
    {
      idTask: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      estatus: {
        type: DataTypes.ENUM("running", "stopped", "deleted"),
        defaultValue: "stopped",
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      fechaActualizacion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Tasks",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  //Agregando Hooks

  Tasks.beforeUpdate((task) => {
    task.fechaActualizacion = Date.now();
  });

  return Tasks;
};
