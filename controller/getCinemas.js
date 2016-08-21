var jsdom = require('jsdom');
var makeRequest = require('./makeRequest');
var fs = require('fs');
var path = require('path');

//var jquery = fs.readFileSync(path.join(__dirname,'../resources/jquery.js'),'utf-8');
var cheerio = require('cheerio');
var spicinemasChennai = [
{
	cinema: 'Sathyam',
	type: 'SPI',
	code: 'SATHYAM'
},
{
	cinema: 'Escape',
	type: 'SPI',
	code: 'ESCAPE'

},
{
	cinema: 'Palazzo',
	type: 'SPI',
	code: 'PALAZZO'
},
{
	cinema: 'S2 Theyagaraja',
	type: 'SPI',
	code: 'S2-THEYAGARAJA'
},
{
	cinema: 'S2 Perambur',
	type: 'SPI',
	code: 'S2-PERAMBUR'	
}
];

var spicinemasCoimbatore = [
{
	cinema: 'The Cinema',
	type : 'SPI',
	code: 'THE-CINEMAS'
}
];
function getCinemas(city,callback){
	var city = city;
	// this.req = req;
	// this.res = res;
	var callback = callback;
	var options = {
		url: 'https://in.bookmyshow.com/'+city+'/cinemas',
		headers: {
			'Host': 'in.bookmyshow.com',
			'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Language': 'en-US,en;q=0.5',
			'Accept-Encoding': 'gzip, deflate',
			'Cache-Control':'no-cache',
			'Pragma':'no-cache'
		},
		gzip: true
	};
	makeRequest(options, cinemasCallback.bind(this,city,callback));
}

function cinemasCallback(city,callback,error,response,body) {
	if(error)
		return callback(error)
	else {
		var date = new Date();

		var $ = cheerio.load(body);
		var cinemaList = [];
		$($('body').find('.cinema-brand-list .__cinema-tiles')).each(function(){
			var cinemaName = $(this).find('.__cinema-info .__cinema-text a').html();
			var cinemaCode = $(this).find('.__cinema-info .__cinema-text a').attr('href').split('/');
			cinemaCode = cinemaCode[cinemaCode.length-1];
			var cinemaObj = {
				cinema: cinemaName,
				code: cinemaCode,
				type: 'BMS'
			};
			cinemaList.push(cinemaObj);
		});
		if(city=="chennai")
			cinemaList = cinemaList.concat(spicinemasChennai);
		else if(city=="coimbatore")
			cinemaList = cinemaList.concat(spicinemasCoimbatore);
		return callback(undefined,cinemaList);
	}
}

module.exports = getCinemas;