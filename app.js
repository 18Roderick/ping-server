const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const favicon = require('serve-favicon');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const User = require('./models/index');
const index = require('./routes/index');
const user = require('./routes/users');
const api = require('./routes/api');
const { sequelize } = require('./models');
const isAuth = require('./middlewares/isAuth');
const extendedDefaultFields = require('./services/extendedDefaultFields');
//const Pinging = require('./ping/pinging');


const app = express();

const store = new SequelizeStore({
	db: sequelize,
	table: 'Session',
	extendedDefaultFields,
})

const publicDir = path.join(__dirname, 'public');
const bulmaDir = path.join(path.join(__dirname, 'node_modules'),'bulma' );
const favionUrl = path.join(publicDir, 'image', 'favicon.ico')
const viewDir = path.join(__dirname, 'views');
const port = (process.env.PORT || 3000);


app.set('views', viewDir);

app.set('view engine', 'pug');

app.set('port', port);

app.use(favicon(favionUrl));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cookieParser());

app.use(session({
	secret: "abc 234 55",
	store: store,
	resave: false,
	saveUninitialized: false,
}));

app.use(logger('dev'));

app.use(express.static(publicDir));

app.use(express.static(bulmaDir));

app.use('/', index);

app.use(isAuth);

app.use('/api', api);

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



const server = app.listen(app.get('port'), () => {
	console.log(`Iniciando express en el puerto ${app.get('port')}`);
	//const p = new Pinging();
});


//module.exports = app;
module.exports = server;