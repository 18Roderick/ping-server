require("dotenv").config();

const path = require("path");
const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const { queueManager } = require("./tasks/QueueManager");

//const io = require("./socketIo/index");
//Archivo con las variables de configuración

//error routes
const errorController = require("./controllers/errors");
const routes = require("./routes");

const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullAdapter(queueManager.pingMonitor),
    new BullAdapter(queueManager.serverTasks),
    new BullMQAdapter(queueManager.webSocket),
  ],
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath("/monitor/reportes");

const app = express();

//middleware

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "100kb", parameterLimit: "1000" }));
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "/public")));

app.use("/monitor/reportes", serverAdapter.getRouter());
app.use(routes);

//rutas de errores
app.use(errorController.error404);
app.use(errorController.catchError);

module.exports = app;
