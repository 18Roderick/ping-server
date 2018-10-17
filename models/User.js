'use strict'

module.exports = (sequelize, DataTypes) => {

	return sequelize.define('User', {
		nombre: {
			type: DataTypes.STRING,
			validate: {
				notEmpty:{
					msg: "Falta Nombre"
				}
			}
		},

		apellido: {
			type: DataTypes.STRING,
			validate: {
				notEmpty:{
					msg: "Falta Apellido"
				}
			}
		},

		nacimiento: {
			type: DataTypes.DATE,
			validate: {
				notEmpty:{
					msg: "Falta fecha de nacimiento"
				}
			}
		},

		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: {
					msg: "Falta correo"
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
		}



	}, {

		freezeTableName: true,
		comment: "Tabla de usuarios del proyecto Ping Ring"

	})
}