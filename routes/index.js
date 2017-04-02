var express = require('express');
var router = express.Router();

//GET /
router.get('/', function(req, res, next){
    return res.render('mainpage.html', {pageTitle : 'mainpage'});
});

router.get('/google8947d3762b9e857f.html', function(req, res, next){
    return res.render('google8947d3762b9e857f.html');
});

module.exports = router;