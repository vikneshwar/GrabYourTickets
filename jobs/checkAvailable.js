
console.log("Started Checking at: "+ Date());
//var jsdom = require('jsdom');
var cheerio = require('cheerio');
var async = require('async');
var makeRequest = require('../controller/makeRequest.js');
var notificationCntrl = require('../controller/sendNotification.js');
// var memoryCache = require('../utility/memoryCache.js');
//initialize database
var mongoose = require('mongoose');
mongoose.promise = require('q').Promise;
var config = require('../config.js');

mongoose.connect(config.MONGODB_URL);
var User = require('../models/UserModel.js');
var fs = require('fs');
var path = require('path');


function checkAvailable() {
	var from = new Date();
	var to = new Date();
	to.setDate(to.getDate()+14);

	User.find({
		"date": {
			$gt: from.toISOString(),
			$lte: to.toISOString()
		}
	}).exec()
	.then(function(data){
		var urlMapper = {};
		data.forEach(function(item,index){
			var url = item._doc.url.split("||");
			url.forEach(function(urlItem,urlIndex){
				var userInfo = (urlMapper[urlItem]!=undefined ? urlMapper[urlItem] : []);
				userInfo.push(item._doc);
				urlMapper[urlItem] = userInfo;
			});
		});

		async.forEachOfSeries(urlMapper,this.processData.bind(this),function(err){
			console.log("\nFinished Checking at: "+ Date());
			process.exit();
		});
	}.bind(this))
	.catch(function(err){
		console.log("Error Processing"+err);
	})

}

checkAvailable.prototype.processData = function(record,url,callback){
	this.callback = callback;
	async.waterfall([
		this.sendRequest.bind(null,record,url),
		this.checkCinemas.bind(null,record,url),
		this.sendNotification,
		this.deleteData,
		],this.finalCallback.bind(this));
}

checkAvailable.prototype.sendRequest = function(record,url,cb){
		//TODO: Handle Multiple URL'S

		var options = {
			url: url ,
			followRedirect: false,
			headers: {
				'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.5',
				'Accept-Encoding': 'gzip, deflate',
				'Cache-Control':'no-cache',
				'Pragma':'no-cache'
			},
			gzip: true
		};
	// var scope = Object.create(this);
	makeRequest(options,function(err,response,body){
		if(err)
			return cb(err)
		else if(response.statusCode!="200")
			return cb(new Error("404 for URL==>"+url),record);
		else
			cb(null,body);
	});
}

checkAvailable.prototype.checkCinemas = function(record,url,body,cb){
	var $ = cheerio.load(body);
	var count;
	var toDelete = [];
	record.forEach(function(v,i){
		var cinemasList = v.theater.split(',');
		var toDelete = [];
		var orgCode;
		var theaterStr = [];
		cinemasList.forEach(function(code,index){
			if(url.indexOf('spicinemas') >-1){
				if(code.startsWith('SPI')){
					toDelete.push(code);
					theaterStr.push(code.substring(4));
				}
			}
			else {
				if(code.startsWith('BMS')) {
					orgCode = code.substring(4);
					var len = $($("body").find('section.phpShowtimes li[data-id="'+orgCode+'"]')).length;

					if(len > 0){
						var theaterName = $($("body").find('section.phpShowtimes li[data-id="'+orgCode+'"]')).data('name');
						theaterStr.push(theaterName);
						toDelete.push(code);
					}
				}
			}

		});
		v.toDelete = toDelete;
		v.theaterStr = theaterStr;
		if(toDelete.length == cinemasList.length)
			v.deleteAll = true;	
	});
	cb(null,record);
}
checkAvailable.prototype.sendNotification = function(records,cb){
	async.each(records,function(record,notifiCallback){
		if(record.toDelete.length > 0){
			async.parallel([
				function(another_cb){
					if(record.emailId != null && record.emailId != undefined && record.emailId.trim() != "") {
						notificationCntrl.sendEmail(record,function(err,resp){
							if(err)
								another_cb(err);
							else 
								another_cb(null,resp)
						});
					}
					else
						another_cb(null,null);
				},
				function(another_cb){
					if(record.mobileNumber != null && record.mobileNumber != undefined && record.mobileNumber.trim() != ""){
						notificationCntrl.sendSMS(record,function(err,resp){
							if(err)
								another_cb(err);
							else
								another_cb(null,resp);
						});
					}
				}],
				function(err,result){
					if(err)
						notifiCallback(err);
					else 
						notifiCallback();
				}
				);
		}
		else {
			notifiCallback();
		}
	},function(err){
		cb(err,records)
	});
}

checkAvailable.prototype.deleteData = function(records,cb){
	async.each(records,
		function(record,callback){
			if(record.toDelete.length > 0) {
				User.findById(record._id).exec()
				.then(function(data){
					if(data != undefined && data != null) {
						var theaters = data._doc.theater.split(',');
						var toUpdate = theaters.diff(record.toDelete);
						var url = "";
						if(toUpdate.length > 0) {
							var toUpdateStr = toUpdate.toString();
							if(record.url.indexOf('||') != -1) {
								if(toUpdateStr.indexOf('SPI') != -1 && toUpdateStr.indexOf('BMS') != -1)
									url = record.url;
								else if(toUpdateStr.indexOf('SPI') != -1) 
									url = record.url.split('||')[0];
								else if(toUpdateStr.indexOf('BMS') != -1)
									url = record.url.split('||')[1];
							} else {
								url = record.url;
							}
							return User.findByIdAndUpdate(data._doc._id, {theater: toUpdate,url: url}).exec();
						} else {
							return User.findByIdAndRemove(data._doc._id).exec();
						}
					} else {
						callback();
					}
				})
				.then(function(doc){
					console.log('updated doc:' +doc._doc);
					callback();
				})
				.catch(function(err){
					console.log('Error updating doc:' +err);
					return callback(err);
				});
			} else {
				callback();
	 		}

/*			if(record.deleteAll == true){
				User.findOneAndRemove({
					email:record.email,
					mobileNumber: record.mobileNumber,
					movie: record.movie,
					date: record.date
				},function(err,doc){
					if(err) 
						return callback(err,doc);
					else {
						console.log('deleted doc: '+doc);
						callback();
					}
				});
			}
			else {
				var allCinemas = record.theater.split(",");
				var toDelete = record.toDelete;
				var toUpdate = allCinemas.diff(toDelete);
				User.findOneAndUpdate({
					email: record.email,
					mobileNumber: record.mobileNumber,
					movie: record.movie,
					date: record.date
				},{
					theaterList: toUpdate.toString()
				},function(err,doc){
					if(err) 
						return callback(err);
					else {
						console.log('updated doc: '+doc);
						callback();
					}
				});
}*/
		},
		function(err){
			cb(err,records);
	});
}

checkAvailable.prototype.finalCallback = function(err,records){
	if(err)
		console.log('\n\nError occured in finalCallback: \n '+err+' \n For record: '+JSON.stringify(records));
	this.callback();
}


Array.prototype.diff = function(a) {
	return this.filter(function(i) {return a.indexOf(i) < 0;});
};

module.exports = checkAvailable;