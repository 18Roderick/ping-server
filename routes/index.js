const express = require('express');

const User = require('../models/index').User;

const {encrypt} =  require('../services/crypt')
const router = express.Router();


router.get('/', (req, res) => {

	console.log(req.session)
	res.render('index', {
		title: 'Ping Dong'
	});
});


router.get('/registrar', (req, res) => {
	console.info(req.session)
	res.render('registrar', {
		title: 'Registrar'
	});
});


router.post('/crear-usuario', (req, res) => {
	
	const password = encrypt(req.body.password);
	const userInfo = {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		nacimiento: req.body.nacimiento,
		email: req.body.email,
		password,
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
		.catch(error => {
			console.error(`falla al relizar proceso ${error}`)
		})
	res.redirect('/');


});

router.get('/login', (req, res ) => {
	res.render('login')
})

router.post('/login', (req, res, next) => {
	const { email, password } = {...req.body, password: encrypt(req.body.password) }

	User.findOne({where: {email, password }})
		.then( user => {
			req.session.user = {
				id: user.dataValues.id
			}
			res.render('index', {logged: true})
		})
		.catch( error => {
			console.error(error)
			res.redirect('/')
		})
});

router.get('/logout', (req, res) => {
	req.session.destroy()
	res.redirect('/')
})


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



module.exports = router;