require("dotenv").config();

const path = require("path");
const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

//const io = require("./socketIo/index");
//Archivo con las variables de configuración

//error routes
const errorController = require("./controllers/errors");
const routes = require("./routes");

const app = express();

//middleware

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "100kb", parameterLimit: "1000" }));
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "/public")));

app.use(routes);

//rutas de errores
app.use(errorController.error404);
app.use(errorController.catchError);

module.exports = app;
