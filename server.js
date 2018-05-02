'use strict'

const SocketIO = require('socket.io');


const app = require('./app');
const Pinging = require('./ping/pinging');


const server = app.listen(app.get('port'), () => {
	console.log(`Iniciando express en el puerto ${app.get('port')}`);
});


const io = SocketIO(server);


io.on('connection', (socket) => {
	console.log('nueva conexion', socket.id);
});



module.exports = io;

const p = new Pinging();