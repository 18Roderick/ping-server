import * as dotenv from "dotenv";
dotenv.config();

import * as path from "path";
import * as express from "express";

import * as morgan from "morgan";
import * as cors from "cors";
import helmet from "helmet";
import * as compression from "compression";

//const io = require("./socketIo/index");
//Archivo con las variables de configuración

//error routes
import * as errorController from "./controllers/errors";
import routes from "./routes";

const app: express.Express = express();

//middleware

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "/public")));

app.use(routes);

//rutas de errores
app.use(errorController.error404);
app.use(errorController.catchError);

export default app;
