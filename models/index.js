const Sequelize = require('sequelize');


const config = require('../config/config.json');
const Alias = require('./alias');


const crypto = require('crypto');
const userKey = '154147';
const algorithm = 'aes192';


const operatorsAliases = new Alias(Sequelize).getAlias();

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
	host: config.dbHost,
	dialect: 'mysql',
	logging: false,
	operatorsAliases,
});


const user = sequelize.import(`${__dirname}/User`);
const server = sequelize.import(`${__dirname}/Server`);


user.hasMany(server, {
	foreignKey: "AutorId"
});
server.belongsTo(user, {
	as: 'Author',
	foreignKey: 'AutorId'
});


sequelize.sync({
		force: true
	})
	.then(() => {
		console.log('Conexion exitosa');

		function encrypt(text) {
			let cipher = crypto.createCipher(algorithm, userKey)
			let crypted = cipher.update(text, 'utf8', 'hex')
			crypted += cipher.final('hex');
			return crypted;
		}
		const password = encrypt('09roderick');
		const userInfo = {
			nombre: 'Roderick',
			apellido: 'Romero',
			nacimiento: '1996-09-21 00:00:00',
			email: 'rjrr507@gmail.com',
			password
		}


		user
			.findOrCreate({
				where: userInfo
			})
			.spread((user, created) => {

				if (created) {
					console.log('usuario creado');
				}

			})
	})


exports.user = user;
exports.server = server;