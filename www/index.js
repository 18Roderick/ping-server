const http = require("http");
const socket = require("socket.io");

const app = require("../app");

const config = require("../config/configEnv");

const httpServer = http.createServer(app);

const options = {};

const io = socket(httpServer, options);

io.on("connection", (socket) => {
  console.log("connection a socket");
});

httpServer.listen(config.PORT, () => {
  console.log(`servidor corriendo en puerto ${config.PORT}`);
});
