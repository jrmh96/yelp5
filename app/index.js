var express = require('express');
var app = express();
var ejs = require('ejs');

//view engine set up
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

//Initialize App
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port", port)
});

// serve static files from assets 
app.use(express.static(__dirname + '/assets'));

//include routes
var routes = require('./routes/index');
app.use('/', routes);

//catch 404
app.use(function(req, res, next) {
    var err = new Error('Sorry! that page doesn\'t exist');
    err.status = 404
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var message = err.message
    res.render('error', {
        message: err.message
    })
});