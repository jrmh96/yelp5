var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port", port)
});

app.use(express.static(__dirname + '/public'));

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
    res.render('error.html', {
        message: err.message
    });
});