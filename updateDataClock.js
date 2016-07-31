var makeRequest = require('./controller/makeRequest.js');

var options = {
	url: 'https://grab-your-tickets.herokuapp.com/updateCity',
	headers: {
		'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Accept-Language': 'en-US,en;q=0.5',
		'Accept-Encoding': 'gzip, deflate',
		'Cache-Control':'no-cache',
		'Pragma':'no-cache'
	},
}

makeRequest(options,function(err,response,body){
	console.log(body);
});