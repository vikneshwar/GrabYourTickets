var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var engines = require('consolidate');

var router = require('./routes/routes.js');

var updateCity = require('./jobs/updateCity');


//adding configuration file
var config = require('./config.js');
//initialize database

mongoose.connect(config.MONGODB_URL);

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

app.use('/',router);

/* Define fallback route */
app.use(function(req, res, next) {//jshint ignore:line
    res.status(404).json({
        error: "Route not found"
    });
});

/* Define error handler */
app.use(function (err, req, res, next) {//jshint ignore:line
    // logger.logFullError(err, req.method + " " + req.url);
    res.status(err.httpStatus || 500).send({
		message: err + " Sorry for inconvience, please try again later. Feel free to log the issue."
	});
});


app.listen(config.WEB_SERVER_PORT, function() {
    console.log('Express server listening on: '+config.WEB_SERVER_PORT);
});