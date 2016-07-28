var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var getMovies = require('./controller/getMovies.js');
var getCinemas = require('./controller/getCinemas.js');
var saveController = require('./controller/saveController.js');

var memoyCache = require('./utility/memoryCache.js')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/',express.static(__dirname + '/static'));

app.get('/',function(req,res){
	res.senFile(__dirname + '/static/view/index.html');
});

app.post('/',function(req,res){
	saveController(req,res,function(err,data){

	})
});

app.get('/movies',function(req,res){
	var resData = {};
	getMovies(req,res,function(err,data) {
		if(err)
			req.send(err);
		else{
			resData.movieList = data;
			getCinemas(req,res,function(err,data){
				if(err)
					req.send(err);
				else {
					resData.cinemaList = data;
					res.send(resData);
				}
			});
		}
	});
});



var port = process.env.PORT || 8091;
app.listen(port, function() {
    console.log('Express server listening on: '+port);
});