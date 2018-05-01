const Sequelize = require('sequelize');


const config = require('../config/config.json');
const Alias = require('./alias');


const operatorsAliases = new Alias(Sequelize).getAlias();

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
	host: config.dbHost,
	dialect: 'mysql',
	logging: false,
	operatorsAliases,
});


const user = sequelize.import(`${__dirname}/User`);
const server = sequelize.import(`${__dirname}/Server`); 


user.hasMany(server, { foreignKey: "AutorId"});
server.belongsTo(user, {as: 'Author', foreignKey: 'AutorId'});


sequelize.sync({force: true})
	.then( () => {
		console.log('Conexion exitosa');
	})


exports.user = user;
exports.server = server;



