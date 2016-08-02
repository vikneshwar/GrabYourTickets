var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var engines = require('consolidate');

var getMovies = require('./controller/getMovies.js');
var getCinemas = require('./controller/getCinemas.js');

var updateCity = require('./jobs/updateCity');


//adding configuration file
var config = require('./config.js');
//initialize database

mongoose.connect(config.MONGODB_URL);
var saveController = require('./controller/saveController.js');
 
var memoryCache = require('./utility/memoryCache.js')();
if(config.NODE_ENV.toLowerCase() == "prod") {
	new updateCity();
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', __dirname + '/static/view');
app.engine('html', engines.handlebars);
app.set('view engine', 'html');

app.use('/',express.static(__dirname + '/static'));

app.get('/',function(req,res){
	res.render('index.html');
});

app.post('/',saveController);

app.get('/movie',function(req,res){
	var city = req.query['city'];
	var data = memoryCache.get(city);
	if(Object.keys(data.movieList).length >0 && data.cinemaList.length > 0) 
		res.send(data);
	else
		res.send('Sorry for inconvience , some error occured');
});

app.get('/updateCity',function(req,res){
	new updateCity();
	res.send('Started Updating');
});

/* Define fallback route */
app.use(function(req, res, next) {//jshint ignore:line
    res.status(404).json({
        error: "Route not found"
    });
});

/* Define error handler */
app.use(function (err, req, res, next) {//jshint ignore:line
    // logger.logFullError(err, req.method + " " + req.url);
    res.status(err.httpStatus || 500).render('index.html',{
		message: err + " Sorry for inconvience, please try again later , contact us if issue still persist"
	});
});


app.listen(config.WEB_SERVER_PORT, function() {
    console.log('Express server listening on: '+config.WEB_SERVER_PORT);
});