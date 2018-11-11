const crypto = require('crypto');

const userKey = '154147nkukughhihs87442ssuig72buibui';
const algorithm = 'aes192';


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

module.exports = {
  encrypt,
  decrypt,
}