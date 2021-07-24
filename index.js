require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
//Archivo con las variables de configuración
const config = require("./config/configEnv");

//const connection = require('./database/connection');

//routes

//error routes
const errorController = require("./controllers/errors");
const routes = require("./routes");

const app = express();

//middleware

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//rutas de errores
app.use(errorController.error404);
app.use(errorController.catchError);

app.listen(config.PORT, () => {
  console.log(`servidor corriendo en puerto ${config.PORT}`);
});
