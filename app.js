var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//routes
var routes = require('./routes/index');
var login = require('./routes/login');
var my_blog = require('./routes/my_blog');
//views:
//var loginViews = require('./views/index.ejs');
//models:
/*var usersSchema = require('./models/UsersSchema');
var postsSchema = require('./models/PostsSchema');
var categorysSchema = require('./models/CategorysSchema');
var tagsSchema = require('./models/TagsSchema');*/

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//routes:
app.use('/', routes);
app.use('/login', login);
app.use('/myblog', my_blog);
//views:
//app.use('/', loginViews);
/*//models:
app.use('/', usersSchema);
app.use('/', postsSchema);
app.use('/', categorysSchema);
app.use('/', tagsSchema);*/
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
