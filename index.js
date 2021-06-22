require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//Archivo con las variables de configuración
const config = require("./config/config");

//routes

//error routes
const errorController = require("./controllers/errors/errors");
const routes = require("./routes");

const app = express();

//middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(routes)

//rutas de errores
app.use(errorController.error404);
app.use(errorController.catchError);

app.listen(config.PORT, () => {
  console.log(`servidor corriendo en puerto ${config.PORT}`);
});
