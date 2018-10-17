'use strict'

const SocketIO = require('socket.io');


const server = require('./app');


const io = SocketIO(server);


io.on('connection', (socket) => {
	console.log('nueva conexion', socket.id);

});



module.exports = io;

