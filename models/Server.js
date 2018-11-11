"use strict";
module.exports = (sequelize, DataTypes) => {
  let Server = sequelize.define( "Server", {
      id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      serverName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{
            msg: 'falta nombre del servidor'
          }
        }
      },

      ip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{
            msg: 'falta IP del servidor'
          }
        }
      },

      ping: {
        type: DataTypes.FLOAT
      }
    },

    {
      freezeTableName: true
    }
  );

  return Server
};
