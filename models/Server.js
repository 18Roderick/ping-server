'use strict'
module.exports = (sequelize, DataTypes) => {

	return sequelize.define('Server', {

			serverName: {
				type: DataTypes.STRING,
				allowNull: false
			},

			ip: {
				type: DataTypes.STRING,
				allowNull: false
			},

			ping: {
				type: DataTypes.FLOAT
			}
		},

		{
			freezeTableName: true
		}

	)

}