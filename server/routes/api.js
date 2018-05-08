const express = require('express');

const router = express.Router();


router.get('/', (req, res, next) => {
	res.json({
		message: 'Desde el servidor',
		status: 'ok'
	})
});


module.exports = router;