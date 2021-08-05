require("dotenv").config();

const http = require("http");

const socketIo = require("socket.io");



const server = http.createServer();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SOCKET_PORT = process.env.SERVER_PORT || 3030;

const url = process.env.PRODUCTION
  ? `http://localhost:${SERVER_PORT}`
  : `http://localhost:${SERVER_PORT}`;

const io = socketIo(server, {
  cors: {
    origin: url,
  },
});

server.listen(SOCKET_PORT, () => {
  console.log("Socket running on port " + SOCKET_PORT);
});

module.exports = io;
