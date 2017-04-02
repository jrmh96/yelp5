var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var app = express();

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use('/assets', express.static(process.cwd() + "/assets"));
//Initialize App
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port", port)
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//include routes
//var routes = require('../routes/index.js');
app.get('/', function(req, res, next){
    return res.render('mainpage.html', {pageTitle : 'mainpage'});
});

app.get('/google8947d3762b9e857f.html', function(req, res, next){
    return res.render('google8947d3762b9e857f.html');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var message = err.message
    res.render('error', {
        message: err.message,
        status: err.status
    });
});