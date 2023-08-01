import * as dotenv from "dotenv";
dotenv.config();

import * as http from "node:http";
import * as socketIo from "socket.io";

const server = http.createServer();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SOCKET_PORT = process.env.SERVER_PORT || 3030;

const url = process.env.PRODUCTION
	? `http://localhost:${SERVER_PORT}`
	: `http://localhost:${SERVER_PORT}`;

const io = new socketIo.Server(server, {
	cors: {
		origin: url,
	},
});

server.listen(SOCKET_PORT, () => {
	console.log("Socket running on port " + SOCKET_PORT);
});

module.exports = io;
