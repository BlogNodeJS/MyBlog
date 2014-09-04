var express = require('express');
var router = express.Router();
var loginController = require('../controllers/LoginController');

router = loginController(router);
module.exports = router;
