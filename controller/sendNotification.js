var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config.js')
var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	auth: {
		user: 'mailtester1993@gmail.com',
		pass: '#MAILtester123'
	}
}));
//('smtps://mailtester1993%40gmail.com:#MAILtester123@smtp.gmail.com');


function sendEmail(data,callback){
	var cinemasTemplate ="<ul>";
	data.theaterStr.forEach(function(cinemas,index,theaterStr){
		cinemasTemplate += "<li>"+cinemas+"</li>";
		if(theaterStr.length === index)
			cinemasTemplate += '</ul>';
	});
	var mailOptions = {
		from: '"Vikneshwar" <mailtester1993@gmail.com>' ,
		to: data.emailId, 
		subject: 'Hey , Movie Tickets are open',
		html: 'Hey <b> '+data.name+ ' </b> i guess you have registered to send notification if tickets are available for the movie <b>'+data.movie+ '</b> so, hurry up the tickets are open in the following cinemas</br></br>'+cinemasTemplate+'</br>Click <a="'+data.url+'">here</a> to book tickets now'
	}

	transporter.sendMail(mailOptions,function(err,info){
			console.log("\n Email Error:"+err);
			console.log('\n Email info.accepted: '+info.accepted);
			console.log('\n Email info.rejected: '+info.rejected);
			console.log('\n Email info.response: '+info.response);
			return callback(err,info);
	});
}

var msg91 = require('msg91')("120358AwPrfQEohb657962d68","GYTNOT","4");

function sendSMS(data,callback) {
	if(config.NODE_ENV.toLowerCase() == "dev")
		return callback(null,"success");

	var mobileNo = data.mobileNo;

	var cinemasTemplate ="";
	data.theaterStr.forEach(function(cinemas,index,theaterStr){
		cinemasTemplate += " " + (index+1) + ") "+cinemas;
	});
	/*
	var message = "Hey , Tickets are open in following theaters" + cinemasTemplate;
	msg91.send(mobileNo,message,function(err,response){
		console.log("\n MSG91 Error:" +err);
		console.log("\n MSG91 Response:" +response);
		return callback(err,response)	
	});
	*/
}

module.exports = {
	sendEmail: sendEmail,
	sendSMS: sendSMS
}