const app = require('../app');
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log('Nuevo usuario conectado')
});