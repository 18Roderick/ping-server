'use strict'

module.exports = (sequelize, DataTypes) => {

	return sequelize.define('User', {
		nombre: {
			type: DataTypes.STRING,
			validate: {
				msg: "Falta Nombre"
			}
		},

		apellido: {
			type: DataTypes.STRING,
			validate: {
				msg: "Falta Apellido"
			}
		},

		fechaNacimiento:{
			type: DataTypes.DATE,
			validate:{
				msg: "Falta fecha de nacimiento"
			}
		},

		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: "Falta username"
				}
			}
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Falta password"
				}
			}
		},

		email: {
			type: DataTypes.STRING,
			unique: true,
			valide: {
				isEmail: true,
				notEmpty: {
					msg: "Falta correo"
				}
			}
		}

	},
	{
		freezeTableName: true,
		comment: "Tabla de usuarios del proyecto Ping Ring"
	}
	)
}