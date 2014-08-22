var express = require('express');
var router = express.Router();
//var homeController = require('../controllers/HomeController');

//router = homeController(router);


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;