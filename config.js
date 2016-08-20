module.exports = {
	WEB_SERVER_PORT: 		process.env.PORT || 8091, //server port

	MONGODB_URL: 			process.env.MONGODB_URL, // Mongo URL

	NODE_ENV: 				process.env.NODE_ENV, //Node Environmant

	MAIL_GUN_KEY: 			process.env.MAIL_GUN_KEY, //Mail Gun Email KEY

	SECRET_TO_UPDATE: 		process.env.SECRET_TO_UPDATE, //Secret used in route to update information

	MSG_API_KEY: 			process.env.MSG_API_KEY, // MSG91 SMS Provider KEY

	CAPTCHA_PUBLIC_KEY: 	process.env.CAPTCHA_PUBLIC_KEY, //reCaptcha Public key

	CAPTCHA_PRIVATE_KEY: 	process.env.CAPTCHA_PRIVATE_KEY, //reCaptcha Private key

	CRYPTO_KEY: 			process.env.CRYPTO_KEY, //AES Secret key

	CRYPTO_IV: 				process.env.CRYPTO_IV, //AES Initialization Vector

	SESSION_SECRET: 		process.env.SESSION_SECRET //Express Session Secret Key

}