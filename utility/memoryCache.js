var cache = {};
var redis = require('redis');
var client = redis.createClient();

client.on('connect',function(){
	console.log("redis connected");
});

client.get('data',function(err,reply){
	if(err) console.log(err);
	if(reply != null) cache = JSON.parse(reply);
});

var memoryCache = function(){
	return {
		get: function(key){
			return cache[key];
		},
		set: function(key,value){
			cache[key] = value;
		},
		getAll: function(){
			return cache;
		}
	}
}

module.exports = memoryCache;