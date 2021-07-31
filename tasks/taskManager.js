const taskManager = (function () {
  const { fork } = require("child_process");
  const path = require("path");

  let retries = 0;
  let limitRetries = 5;

  const childPath = path.join(__dirname, "taskPing.js");

  let forked = fork(childPath);

  const init = function () {
    forked = fork(childPath);
    initChild();
  };

  const retryProcess = (err) => {
    if (err) {
      console.log("Error", err);
    }

    if (retries < limitRetries) {
      console.log("Reintentando conexión");
      if(forked.exitCode != null) {
        forked.kill();
       // forked.disconnect();
        
      }
      init();
      retries++;
    } else {
      console.log("Se Han excedido Cantidad de intentos");
    }
  };


  const initChild = () => forked.send({ init: true });

  forked.on("message", (msg) => {
    console.log("Message from child", msg);
  });

  process.on("error", (err) => {
    retryProcess();
  });

  forked.on("spawn", () => {
    console.log("Proceso Iniciado");
    retries = 0;
  });

  forked.on("exit", (err) => {
    retryProcess();
  });

  forked.on("error", (err) => {
    retryProcess(err);
  });

  //Iniciar Sub Proceso

  
  initChild();

  // forked
  //return this;
})();

console.log(taskManager);
module.exports = taskManager;
