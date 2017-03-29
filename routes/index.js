var express = require('express');
var router = express.Router();
var mid = require('../middleware');

//GET /
router.get('/', function(req, res, next){
    return res.render('mainpage.html', {pageTitle : 'mainpage'});
});