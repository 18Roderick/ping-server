import * as dotenv from "dotenv";
dotenv.config();

import * as http from "node:http";
import * as socketIo from "socket.io";
//const { sequelize } = require("../models");

import app from "../app";

import config from "../config/configEnv";

//const pingWorker = require("../tasks/taskManager");

const httpServer = http.createServer(app);

const options = {};

const io = new socketIo.Server(httpServer, options);

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

// sequelize
// 	.authenticate()
// 	.then(() => {
httpServer.listen(config.PORT, () => {
	console.log(`servidor corriendo en puerto ${config.PORT}`);
});
// })
// .catch((err) => {
// 	console.error(err);
// });
