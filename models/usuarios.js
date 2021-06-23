'use strict';
const {
  Model,
  literal
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuarios.init({
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    estatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EstatusUsuarios', // Can be both a string representing the table name or a Sequelize model
        key: 'tipo'
      }
    },
    nombre:{
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Ingrese su Apellido'
        }
      }
    },
    apellido:{
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Ingrese su Apellido'
        }
      }
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      validate:{
        isEmail:{
          msg:'El email ingresado no es valido'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Ingrese su Contraseña'
        }
      }
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    fechaActualizacion: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
    },
  }, {
    sequelize,
    modelName: 'Usuarios',
    timestamps: false,
  });
  return Usuarios;
};