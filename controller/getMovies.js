var jsdom = require('jsdom');
var makeRequest = require('./makeRequest');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

var jquery = fs.readFileSync(path.join(__dirname, '../resources/jquery.js'), 'utf-8');

function getMovies(city, callback) {
    // console.log(this);
    var city = city;
    // this.req = req;
    // this.res = res;
    var callback = callback;
    // console.log(req)
    // console.log('https://in.bookmyshow.com/'+city+'/movies/nowshowing')
    var options = {
        url: 'https://in.bookmyshow.com/' + city + '/movies/nowshowing',
        headers: {
            'Host': 'in.bookmyshow.com',
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        },
        gzip: true
    };
    // var scope = Object.create(this);
    makeRequest(options, movieCallback.bind(this, city, callback));

}


function movieCallback(city, callback, error, response, body) {
    if (error)
        return callback(error);
    else {
        var date = new Date();
        console.log("success call for movies in" + city);
        var movielist = {};
        //fs.writeFileSync('../temp.html', body, console.log("saved"));
        var $ = cheerio.load(body);
        var monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        /*added for movies in now showing tab*/
        $($.find('#now-showing div.movie-card-container[data-selector="movies"]')).each(function() {
            var movieName = $(this).attr('data-search-filter').slice(7);
            //var url = $.find('.movie-card .card-container .book-button a').attr('href');

            /*if there is only one type*/
            if ($(this).find('.movie-card .card-container .book-button').has('a').length > 0) {
                var url = $(this).find('.movie-card .card-container .book-button a').attr('href');
                url = url.slice(0, -9);
                url = 'https://in.bookmyshow.com' + url;

                /*to apped SPI Cinemas URL */
                url = appendUrl(city, url, movieName);

                var temp = {};
                // temp.movie_name = movieName;
                temp.url = url;
                temp.type = "NS"; //now-showing
                movielist[movieName] = temp;
                // var movieName = $(this).attr('data-search-filter').slice(7);

                /*if there is many type like - language | 2D | 3D */
            } else {
                var langMovie = $(this).find('.card-container .experience-holder .language-based-formats');
                /*parse for each language*/
                $(langMovie).each(function() {
                    var lang = $(this).find('.header').html();
                    /*parse for each experiences - 2D | 3D */
                    $($(this).find('.content a')).each(function() {
                        var url = $(this).attr('href').slice(0, -9);
                        url = 'https://in.bookmyshow.com' + url;

                        /*to apped SPI Cinemas URL */
                        url = appendUrl(city, url, movieName);

                        var format = $($(this).find('.__format')).html();
                        var movie = movieName + '-' + lang + '-' + format;
                        var temp = {};
                        temp.url = url;
                        temp.type = "NS";
                        movielist[movie] = temp;
                    });
                })
            }

        });
        /*added for movies in coming soon tab*/
        // var dateLimit = '[data-year='+date.getFullYear()+'][data-month='++']'
        $(constructSelector()).each(function() {

            var movie = $(this).find('.movie-card .detail a.__movie-name').attr('href').split('/');
            // var eventCode = $(this).find('.movie-card img.__poster').attr('src');

            var eventCode = movie[movie.length - 1];

            movie = movie[movie.length - 2];
            var movieName = movie;
            if (movie.indexOf('3d') !== -1) {
                movieName = movie.slice(0, -3)
            }

            var url = 'https://in.bookmyshow.com/buytickets/' + movie + '-' + city + '/movie-' + city.slice(0, 4) + '-' + eventCode + '-MT/';

            /*to apped SPI Cinemas URL */
            url = appendUrl(city, url, movieName);

            movie = movie.split('-').map(function(name) {
                return name.capitalizeFirstLetter();
            });
            movie = movie.join('-');
            /*getting the date of release*/
            var releaseInfo = $(this).find('.release-info .date')
            var day = $(releaseInfo).find('.day').html();
            var month = $(releaseInfo).find('.month').html();
            month = monthArr.indexOf(month);
            var releaseDate = new Date(date.getFullYear(), month, parseFloat(day))
                /*construct a object*/
            var temp = {
                url: url,
                type: "CS",
                date: releaseDate
            }
            movielist[movie] = temp;
        });
        console.log("success call for data-movies in" + city);
        return callback(undefined, movielist);

    }
}
/*construct selector for coming soon movies for this and next month in bookmyshow*/
function constructSelector() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var nextMonth = date.getMonth() + 2;
    /*maintaining this to be string to prevent truncation of leading zero using parserInt*/
    month = ("0" + month).slice(-2);
    nextMonth = ("0" + nextMonth).slice(-2);
    var commonQuery = '#coming-soon aside.movie-card-container[data-date!="tentative"]'
    var upcomingMovieQuery = commonQuery + '[data-year="' + year + '"][data-month="' + month + '"],' + commonQuery + '[data-year="' + year + '"][data-month="' + nextMonth + '"]';
    return upcomingMovieQuery;
}
/*this appends spicinemas URL to the existing URL*/
function appendUrl(city, url, movieName) {
    if (city == "chennai" || city == "coimbatore") {
        var spiUrl = 'https://www.spicinemas.in/' + city + '/now-showing/' + movieName + '/';
        url = url + '||' + spiUrl.toLowerCase();
    }
    return url;
}
module.exports = getMovies;

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}