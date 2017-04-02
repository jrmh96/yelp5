var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var app = express();
var http = require('http');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use('/assets', express.static(process.cwd() + "/assets"));

function httpGet(theUrl)
{
    var options = {
        hostname : theUrl,
        port: '80',
        headers : {
             'Content-Type' : 'application/json',
             'Authorization' : 'Bearer dz3FFxfSP9uU2W9tpo9qwIQ0AfW1AsS_EEjKYJoox59wwDPGzaWxL8_O9xQ8ECe5ZFTRrqz88Waip4tP3rFQaNPF8jVl6f9RZCu2-WLa8DWTdk-wyvcovKXzZmrhWHYx'
        }
    }
    return http.get(options, function(res){
        console.log(res.body);
    });
}

//Initialize App
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//include routes
//var routes = require('../routes/index.js');
app.get('/', function(req, res, next){
    return res.render('mainpage.html', {pageTitle : 'mainpage'});
});

app.post('/results', function(req, res, next){

    //get first five results
    var location = req.body.location;
    var food = req.body.food;

    var r = httpGet("https://api.yelp.com/v3/businesses/search?limit=5&amp;location=" + location + "&amp;term=" + food);
    
    //res.render page with results
    res.render('results.html', 
    {
        pageTitle : 'results',
        results : JSON.stringify(r)
    });
});

app.get('/google8947d3762b9e857f.html', function(req, res, next){
    return res.render('google8947d3762b9e857f.html');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var message = err.message;
    res.render('error', {
        message: err.message,
        status: err.status
    });
});