var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use('/assets', express.static(process.cwd() + "/assets"));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Initialize App
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//include routes
//var routes = require('../routes/index.js');
app.get('/', function(req, res, next){
    return res.render('mainpage.html', {pageTitle : 'mainpage'});
});

app.post('/results', function(req, res, next){

    //get first five results

    var location = req.body.location;
    var loc = encodeURI(location);
    var f = req.body.food;
    var food = encodeURI(f);

    var URL = "https://api.yelp.com/v3/businesses/search?limit=5&amp;location=" + loc + "&amp;term=" + food;
    var oReq = new XMLHttpRequest();
    function reqListener() {
        data = JSON.parse(this.responseText);    
        console.log(data);
        res.render('results.html', 
        {
            pageTitle : 'results',
            data: data
        });
    }
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", URL);
    oReq.setRequestHeader("Authorization", 'Bearer dz3FFxfSP9uU2W9tpo9qwIQ0AfW1AsS_EEjKYJoox59wwDPGzaWxL8_O9xQ8ECe5ZFTRrqz88Waip4tP3rFQaNPF8jVl6f9RZCu2-WLa8DWTdk-wyvcovKXzZmrhWHYx');
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send();
    //res.render page with results
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