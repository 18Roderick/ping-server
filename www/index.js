const http = require("http");
const socket = require("socket.io");

const app = require("../app");

const config = require("../config/configEnv");

//const pingWorker = require("../tasks/taskManager");

const httpServer = http.createServer(app);

const options = {};

const io = socket(httpServer, options);

//let eventHanlder = pingWorker.Event();

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

/*   eventHanlder.on("ping", (data) => {
    socket.emit("serverPing", data);
  }); */
});

httpServer.listen(config.PORT, () => {
  console.log(`servidor corriendo en puerto ${config.PORT}`);
});
