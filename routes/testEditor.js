var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/testEditor', function(req, res) {
    res.render('testEditor', { title: 'Express' });
});

module.exports = router;

/**
 * Created by Beto on 8/18/2014.
 */
