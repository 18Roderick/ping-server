const http = require("http");
const socket = require("socket.io");

const { sequelize } = require("./models/index");

const app = require("./app");

const config = require("./config/configEnv");

const httpServer = http.createServer(app);

const serverTasks = require("./tasks/serverTasks");

const options = {};

let retryCount = 0;

const io = socket(httpServer, options);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//retry server

httpServer.on("error", (e) => {
  if (e.code === "EADDRINUSE" && retryCount < 3) {
    console.log(`Intentando iniciar la aplicación count ${retryCount}`);
    setTimeout(() => {
      httpServer.close();
      httpServer.listen(config.PORT);
      retryCount++;
    }, 5000);
  }
});

async function start() {
  try {
    //verificar acceso a la base de datos
    await sequelize.authenticate();
    console.log(`Acceso a base de Datos`);

    //verificar lo parámetros de estatus de tablas
    const task = await serverTasks.verifyDatabaseData();
    console.info("Verificación de parámetros de base de datos ejecutada ", task);

    //iniciar monitoreo

    await httpServer.listen(config.PORT, () => {
      console.log(`Servidor corriendo en puerto ${config.PORT} `);
    });
  } catch (error) {
    console.error("Error Iniciando la aplicación", error);
  }
}

start();
