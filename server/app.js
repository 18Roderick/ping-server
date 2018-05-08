const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const User = require('./models/index');
const index = require('./routes/index');
const user = require('./routes/users');
const api = require('./routes/api');
const Pinging = require('./ping/pinging');


const app = express();


const publicDir = express.static(`${__dirname}/public`);
const viewDir = `${__dirname}/views`;
const port = (process.env.PORT || 8000);


app.set('views', viewDir);

app.set('view engine', 'pug');

app.set('port', port);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cookieParser());

app.use(session({
	secret: "Your secret key",
	resave: false,
	saveUninitialized:false
}));

app.use(logger('dev'));

app.use(publicDir);

app.use('/', index);

app.use('/api', api);

app.use(checkSession);

app.use('/users', user);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function checkSession(req, res, next) {
	if (req.session.user) {
		next(); //If session exists, proceed to page
	} else {
		var err = new Error("No tiene acceso por favor crear cuenta");
		console.log(req.session.user);
		next(err); //Error, trying to access unauthorized page!
	}
}


const server = app.listen(app.get('port'), () => {
	console.log(`Iniciando express en el puerto ${app.get('port')}`);
	//const p = new Pinging();
});


//module.exports = app;
module.exports = server;