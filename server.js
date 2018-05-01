'use strict'

const app = require('./app');
const server = app.listen(app.get('port'), () => {
	console.log(`Iniciando express en el puerto ${app.get('port')}`);
});

