const taskManager = (function () {
	const { fork } = require("child_process");
	const path = require("path");
	const EventEmitter = require("events");
	let retries = 0;
	let limitRetries = 5;

	const childPath = path.join(__dirname, "taskPing.js");

	let forked = fork(childPath);

	function Event() {
		let eventHanlder = new EventEmitter();

		forked.on("message", (data) => {
			if (typeof data === "object") {
				if (data.data) eventHanlder.emit("ping", data.data);
			}
		});

		//eventHanlder.addListener("ping", (data) => {});

		return eventHanlder;
	}

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
			if (forked.exitCode != null) {
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
		// console.log("Message from child", msg);
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
	return {
		Event: Event,
	};
})();

const event = taskManager.Event();

event.on("message", (msg) => {
	// console.log("Message from child", msg);
});

module.exports = taskManager;
