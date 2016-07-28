var request = require('request');


var url='https://in.bookmyshow.com/buytickets_v1/the-jungle-book-3d-chennai/movie-chen-ET00034007-MT/20160430';

var options = {
	url: url,
	headers: {
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Accept-Encoding': 'gzip, deflate',
		'Host': 'in.bookmyshow.com',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36',
		'Accept-Language':'en-US,en;q=0.5',
		'Connection': 'keep-alive'
	},
	gzip: true
}
request(options,function(error,response,body){
	if(error)
		console.log(error);
	else 
		console.log(body);
});