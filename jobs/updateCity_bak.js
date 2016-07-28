var fs = require('fs');
var memoryCache = require('../utility/memoryCache.js')();

/*initialize controller*/
var getMovies = require('../controller/getMovies.js');
var getCinemas = require('../controller/getCinemas.js');

fs.readFile('../utility/city.json','utf-8',function(err,data){
	if(err)
		console.log(error);
	else {
		var states = JSON.parse(data);
		console.log("success");
		var cityData={};
		var movieList;
		var cinemaList;
		for(key in states) {
			var city;
			var state = states[key];
			for(var i=0;i<state.length;i++) {
				city = state[i].name;
				getMovies(city.toLowerCase(), function(err,data){
					if(err) console.log(err);
					else {
						movieList = data;
						getCinemas(city, function(err,data){
							if(err) console.log(err);
							else {
								cinemaList = data;
								cityData.movieList = movieList;
								cityData.cinemaList = cinemaList;
								memoryCache.set(city,cityData);
							}
						})
					}

				})
			}
		}
		console.log("completed");
	}
});
