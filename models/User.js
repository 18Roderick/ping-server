'use strict'

module.exports = (sequelize, DataTypes) => {

	let User = sequelize.define('User', {
		id:{
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
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
					msg: "Falta apellido"
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

	}, {

		freezeTableName: true,
		comment: "Tabla de usuarios del proyecto Ping Ring"
		
	})

	User.associate = function(models){
		User.hasMany(models.Server,{onDelete: 'CASCADE', as:'owner'})
	}

	return User
}