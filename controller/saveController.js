var User = require('../models/UserModel.js');
var async = require('async');
var memoryCache = require('../utility/memoryCache.js')();

function saveController(req,res,next) {
	var city = req.body.city;
	var movie = req.body.movie;
	var theaterList = req.body.theater;
	var date = req.body.date.trim();
	var name = req.body.name;
	var mobileNo = req.body.mobileNumber;
	var email = req.body.email;
	// var site = req.body.site;
	// var day = date.chartAt(0);
	// var month = monthArr.indexOf(date.slice(2,date.indexOf(",")));
	// var year = date.slice(-4);
	var cityData = memoryCache.get(city);
	var urlList = cityData.movieList[movie].url;
	
	date = new Date(date);

	var	dateStringBMS = date.getFullYear().toString() 
					+ ("0"+(date.getMonth()+1)).slice(-2)
					+ ("0"+date.getDate()).slice(-2);

	var	dateStringSPI = ("0"+(date.getDate())).slice(-2)
					+"-"+ ("0"+(date.getMonth()+1)).slice(-2)
					+"-"+ date.getFullYear().toString();
	var url = urlList.split('||');
	var urlString="";
	var flag = false;
	if(theaterList.indexOf("SPI") != -1)
	{
		urlString+=url[1]+dateStringSPI;
		flag = true;
	}
	if(theaterList.indexOf("BMS") != -1)
	{
		if(flag == true)
			urlString+="||";
		urlString+=url[0]+dateStringBMS;
	}
	
	var user = new User({
		name: name,
		mobileNumber: mobileNo,
		emailId: email,
		city: city,
		movie: movie,
		theater: theaterList,
		date: date,
		url: urlString
	});

//TODO - make a HTTP request to check tickets are open 

	checkExist(mobileNo,email,movie,date,function(err,isExist){
		if(err) 
			return next(err);
		else if(isExist){
			/*res.render('index.html',{
				message: "You have already registered for same movie on same day"
			});*/
			res.send("You have already registered for same movie on same day");
		}
		else {

			user.save(function(err,saved){
				if(err)
					return next(new Error("Cannot save the information"));
				else{
					/*res.render('index.html',{
						message: "Thanks ! We will notify you once the tickets are open"
					});*/
					res.send("Thanks ! We will notify you once the tickets are open");
				}
			});
		}
	});
}

var checkExist = function(mobile,email,movie,date,callback){
	async.parallel([
		function(cb){
			if(mobile=="" || mobile==undefined || mobile==null) {
				cb(null,'no');
			}
			else {
				User.findOne({mobileNumber:mobile,movie:movie,date:date}).exec()
				.then(function(doc){
					if(doc) {
						 cb(null,'yes');
					} else {
						 cb(null,'no')
					}

				})
				.catch(function(err){
					return cb(new Error("Error reading from database"))
				});
			}
		},
		function(cb){
			if(email=="" || email==undefined || email==null) {
				cb(null,'no');
			}
			else {
				User.findOne({emailId:email,movie:movie,date:date}).exec()
				.then(function(doc){
					if(doc) {
						 cb(null,'yes');
					} else {
						 cb(null,'no')
					}

				})
				.catch(function(err){
					return cb(new Error("Error reading from database"))
				});
			}
		}
	],

	function(err,result){
		if(err)
			return callback(err);
		if(result[0]==="yes" || result[1] ==="yes"){
			//already registered
			callback(null,true);
		}else if(result[0]==="no" && result[1] ==="no"){
			//register user
			callback(null,false);
		}
	});
}

module.exports = saveController;