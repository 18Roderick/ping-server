const express = require('express');
const Server =  require('../models').Server

const router = express.Router();


router.get('/', (req, res, next) => {
	res.render('index', {title: 'User session'});
});

router.get('/servers', async (req, res, next) => {

	try {
		const {id} = req.session.user

		const dataServer = await Server.findAll({
					 where: {UserId: id }, attributes: ['id','serverName', 'ip']})
		console.log(dataServer)
		res.render('server', {title: 'servidores', dataServer })
	} catch (error) {
		console.log(error)
		res.redirect('/login')
	}
})


module.exports = router;