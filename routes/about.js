var express = require('express');
var router = express.Router();
var loginController = require('../controllers/AboutController');

router = loginController(router);
module.exports = router;
