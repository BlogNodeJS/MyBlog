var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MyBlog');
//routes
var routes = require('./routes/index');
var login = require('./routes/login');
var my_blog = require('./routes/my_blog');
var about= require('./routes/about');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: '123456',resave: true, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({dest: './public/images/'}));
//routes:
app.use('/', my_blog);
app.use('/postDetail', my_blog);
app.use('/postByName', my_blog);
app.use('/searchPost', my_blog);
app.use('/postByTags', my_blog)
app.use('/postByCategoryname', my_blog);
app.use('/login', my_blog);
app.use('/logout', my_blog);
app.use('/postAdd',my_blog);
app.use('/postEdit',my_blog);


app.use('/about',about);


//views:
//app.use('/', loginViews);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
