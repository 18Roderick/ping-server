const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');


const User = require('./models/index');
const index = require('./routes/index');
const user = require('./routes/users');


const app = express();


const publicDir = express.static(`${__dirname}/public`);
const nodePublicDir = express.static(`${__dirname}/node_modules`);
const viewDir = `${__dirname}/views` ;
const port = (process.env.PORT || 3000);

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	console.log('Nuevo usuario conectado')
});

app.set('views', viewDir);

app.set('view engine', 'pug');

app.set('port', port);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(logger('dev'));

app.use(publicDir);

app.use(nodePublicDir);

app.use('/', index);

app.use('/users', user);

app.use(error404);


function error404(req, res, next) {
	let error = new Error(),
		locals = {
			title: 'error 404',
			description: 'Recurso no encontrado',
			error: error
		}
	error.status = 404;
	//res.render('error', locals)
	console.log(error);

	next();

}


module.exports = app;