var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var engines = require('consolidate');

var getMovies = require('./controller/getMovies.js');
var getCinemas = require('./controller/getCinemas.js');

//initialize database
var url = 'mongodb://root:root@ds011228.mlab.com:11228/rejected';
//var url = 'mongodb://root:root@apollo.modulusmongo.net:27017/jidog7Ex';
mongoose.connect(url);
var saveController = require('./controller/saveController.js');
 
var memoryCache = require('./utility/memoryCache.js')();

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
	data.cinemaList.forEach(function(item,index){
		item.code = item.type + "-" + item.code;
	});
	if(Object.keys(data.movieList).length >0 && data.cinemaList.length > 0) 
		res.send(data);
	else
		res.send('Sorry for inconvience , some error occured');
});

app.get('/updateCity',function(req,res){
	require('./jobs/updateCity');
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


var port = process.env.PORT || 8091;
app.listen(port, function() {
    console.log('Express server listening on: '+port);
});