var express = require('express');
var router = express.Router();
var updateCity = require('../jobs/updateCity');
var saveController = require('../controller/saveController.js');
var config = require('../config.js');
var memoryCache = require('../utility/memoryCache.js')();

var nodemailer = require('nodemailer');
var Recaptcha = require('recaptcha2');

var recaptcha = new Recaptcha({
	siteKey: config.CAPTCHA_PUBLIC_KEY,
	secretKey: config.CAPTCHA_PRIVATE_KEY
});
/*var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	auth: {
		user: config.EMAIL_ID,
		pass: config.EMAIL_PASS
	}
}));*/

var mg = require('nodemailer-mailgun-transport');
var auth = {
  auth: {
    api_key: config.MAIL_GUN_KEY,
    domain: 'mg.grabyourtickets.in'
  }
}
var transporter = nodemailer.createTransport(mg(auth));


router.get('/',function(req,res){
	res.render('index.html');
});

router.post('/',function(req,res,next){
	recaptcha.validateRequest(req)
	.then(function(){
		saveController(req,res,next);
	})
	.catch(function(error){
		console.log(recaptcha.translateErrors(error));
		res.render('index.html',{
			message: 'Error Validating your reCaptcha . Please try again'
		});
	});
});

router.get('/logissue',function(req,res,next){
	res.render('issue.html');
});
router.post('/logissue',function(req,res,next){
	recaptcha.validateRequest(req)
	.then(function(){
		var message = req.body.issue_input;
		var mailOptions = {
			from: '"Vikneshwar" <mailtester1993@gmail.com>' ,
			to: 'lviknesh@gmail.com', 
			subject: 'Issue Logged',
			html: message
		}
		transporter.sendMail(mailOptions,function(err,info){
			if(err)
				console.log('\n Error sending issue:'+err);
			res.render('issue.html',{
				message: 'Thanks , We will look into the issue as soon as possible'
			});
		});
	})
	.catch(function(error){
		console.log(recaptcha.translateErrors(error));
		res.render('issue.html',{
			message: 'Error Validating your reCaptcha . Please try again'
		});
	});
});
router.get('/movie',function(req,res,next){
	var city = req.query['city'];
	// if(config.NODE_ENV.toLowerCase() == "prod")	
		var data = JSON.parse(memoryCache.get(city));
	// else
		// var data = memoryCache.get(city);

	if(Object.keys(data.movieList).length >0 && data.cinemaList.length > 0) 
		res.send(data);
		// next(new Error('Testing Error'));
	else
		res.send({error:"error getting data"});
});

router.get('/updateCity',function(req,res){
	if(req.query['secret'] === config.SECRET_TO_UPDATE) {
		new updateCity();
		res.send('Started Updating');	
	} else {
		res.send('Cant Update');
	}
});

module.exports = router
