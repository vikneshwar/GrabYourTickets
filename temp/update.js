var cache = require('../utility/memoryCache.js')();


setTimeout(function(){
	cache.set('name','viknesh');
	cache.set('age','23');
}, 60000);
