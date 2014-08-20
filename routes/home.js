/**
 * Created by Beto on 8/19/2014.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res) {
    res.render('home', { title: 'Express' });
});

module.exports = router;