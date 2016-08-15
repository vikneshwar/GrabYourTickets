var nodemailer = require('nodemailer')
/*var smtpTransport = require('nodemailer-smtp-transport');*/
var config = require('../config.js')
/*var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	auth: {
		user: config.EMAIL_ID,
		pass: config.EMAIL_PASS
	}
}));*/
//('smtps://mailtester1993%40gmail.com:#MAILtester123@smtp.gmail.com');

var mg = require('nodemailer-mailgun-transport');
var auth = {
  auth: {
    api_key: config.MAIL_GUN_KEY,
    domain: 'mg.grabyourtickets.in'
  }
}
var transporter = nodemailer.createTransport(mg(auth));


function sendEmail(data,callback){
	var cinemasTemplate ="<ul>";
	data.theaterStr.forEach(function(cinemas,index,theaterStr){
		cinemasTemplate += "<li>"+cinemas+"</li>";
		if(theaterStr.length === index)
			cinemasTemplate += '</ul>';
	});
	var mailOptions = {
		from: '"Grab Your Tickets" <admin@grabyourtickets.in>' ,
		to: data.emailId, 
		subject: 'Hey , Movie Tickets are open',
		html: 'Hey <b> '+data.name+ ' </b> i guess you have registered to send notification if tickets are available for the movie <b>'+data.movie+ '</b> so, hurry up the tickets are open in the following cinemas</br></br>'+cinemasTemplate+'</br>Click <a="'+data.url+'">here</a> to book tickets now'
	}

	transporter.sendMail(mailOptions,function(err,info){
		console.log("\n Email Error:"+err);
		console.log('\n Email info.accepted: '+info.id);
		console.log('\n Email info.rejected: '+info.message);
		return callback(err,info);
	});
}

var msg91 = require('msg91')(config.MSG_API_KEY,"GYTNOT","4");

function sendSMS(data,callback) {
	/*if(config.NODE_ENV.toLowerCase() == "dev")
		return callback(null,"success");
*/
	var mobileNo = data.mobileNumber;

	var cinemasTemplate ="";
	data.theaterStr.forEach(function(cinemas,index,theaterStr){
		cinemasTemplate += " " + (index+1) + ") "+cinemas;
	});
	
	var message = "Hey , Tickets are open in following theaters: " + cinemasTemplate;
	msg91.send(mobileNo,message,function(err,response){
		console.log("\n MSG91 Error:" +err);
		console.log("\n MSG91 Response:" +response);
		return callback(err,response)	
	});
	
}

module.exports = {
	sendEmail: sendEmail,
	sendSMS: sendSMS
}