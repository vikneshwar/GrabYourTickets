var crypto = require('crypto');
var config = require('../config');

const key = config.CRYPTO_KEY;
const iv = config.CRYPTO_IV;
const AESCrypto = {
	encrypt(data) {
		var cipher = crypto.createCipheriv('aes-256-cbc', key, new Buffer(iv,'hex'));
		var crypted = cipher.update(data,'utf8','hex');
		crypted += cipher.final('hex');
		return crypted;
	} ,
	decrypt(data){
		var decipher = crypto.createDecipheriv('aes-256-cbc',key, new Buffer(iv,'hex'));
		var decrypted = decipher.update(data,'hex','utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	}
}

module.exports = AESCrypto;

/*var encText = AESCrypto.encrypt("I was encrypted");
console.log(encText);

var decText = AESCrypto.decrypt(encText);
console.log(decText);*/