/*var async = require('async');

var obj = {
	name:'Viknesh',
	age: '23',
	city: 'Chennai',
	state:'Tamil Nadu',
	country:'India'
}
async.forEachOfSeries(obj,
	function(value,key,callback){

		async.waterfall([waterfall_1,waterfall_2],
		function(err,result){
			if(err)
				callback(err);
		});
		
	},
	function(err,record){
		if(err)
			console.log(err)
	}
);

function waterfall_1(cb) {
	console.log("Inside Waterfall-1");
	cb(null,value)
}

function waterfall_2(value,cb){
	console.log("Inside Waterfall-2 , throwing a error")
	cb(new Error("Error occured processing the key"+key));	
}*/
/*
var array = [
	{
		name: "viknesh",
		age: "23",
		cinemaList : "aaa,bbb,ccc"
	},
	{
		name: "ram",
		age: "24",
		cinemaList : "xxx,yyy,zzz"

	}
];

array.forEach(function(value,index){
	var list = value.cinemaList.split(',');
	var toDelete = [];
	list.forEach(function(v,i){
		toDelete.push(v);
	});
	value.toDelete = toDelete;
});

console.log(array);*/


var cache = require('../utility/memoryCache.js')();


var express = require('express');
var app = express();

app.get('/',function(req,res){
	require('./update.js');
	res.send('<b>Updated</b>');
});

var name, age;
app.get('/getData', function(req,res){
	name = cache.get('name');
	age = cache.get('age');
	res.send({name:name,age:age});
});

app.use(function(req, res, next) {//jshint ignore:line
    res.status(404).json({
        error: "Route not found"
    });
});


var port = process.env.PORT || 8091;
app.listen(port, function() {
    console.log('Express server listening on: '+port);
});

