var msg91 = require('msg91')("120358AwPrfQEohb657962d68","VERIFY","4");

var mobileNo = "9003215452";

var message = "test using api";
/*
msg91.send(mobileNo,message,function(err,response){
	console.log(JSON.stringify(err));
	console.log(JSON.stringify(response));
});
*/

msg91.getBalance("4",function(err,msgCount){
	console.log(err);
	console.log(msgCount);
})
