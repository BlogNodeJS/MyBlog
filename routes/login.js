var express = require('express');
var router = express.Router();
var homeController = require('../controllers/HomeController');

router = homeController(router);
module.exports = router;
