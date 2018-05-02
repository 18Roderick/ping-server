'use strict'

const SocketIO = require('socket.io');


const app = require('./app');



const server = app.listen(app.get('port'), () => {
	console.log(`Iniciando express en el puerto ${app.get('port')}`);
});


const io = SocketIO(server);


io.on('connection', () => {
	console.log('nueva conexion');
});


module.exports = io;