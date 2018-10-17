const express = require('express');
const crypto = require('crypto');

const User = require('../models/index').user;

const router = express.Router();


const userKey = '154147';
const algorithm = 'aes192';


router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Ping Dong'
	});
});


router.get('/registar', (req, res, next) => {
	res.render('registar', {
		title: 'Registrar'
	});
});


router.post('/crear-usuario', (req, res, next) => {
	
	const password = encrypt(req.body.password);
	const userInfo = {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		nacimiento: req.body.nacimiento,
		email: req.body.email,
		password
	}


	User
		.findOrCreate({
			where: userInfo
		})
		.spread((user, created) => {

			if (created) {
				console.log('usuario creado');
			}

		})
	res.redirect('/');


});


router.post('/login', (req, res, next) => {
	
	User.findOne({where: {email: req.params.text}})
		.then( user => {
			let msg ={ disponible: false}
			if(!user){
				msg.disponible = true;
			}
			res.json(msg);
		})
});


router.get('/validar-correo/:text', (req, res) => {
	
	User.findOne({where: {email: req.params.text}})
		.then( user => {
			let msg ={ disponible: false}
			if(!user){
				msg.disponible = true;
			}
			res.json(msg);
		})

})

function encrypt(text) {
	let cipher = crypto.createCipher(algorithm, userKey)
	let crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex');
	return crypted;
}

function decrypt(text) {
	let decipher = crypto.createDecipher(algorithm, userKey)
	let dec = decipher.update(text, 'hex', 'utf8')
	dec += decipher.final('utf8');
	return dec;
}


module.exports = router;