var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var app = express;
var usersSchema = require('../models/UsersSchema');
var postsSchema = require('../models/PostsSchema');
var categorysSchema = require('../models/CategorysSchema');
var tagsSchema = require('../models/TagsSchema');

var HomeController = {
    index: function (req, res) {

        res.render('index', { title: 'Hù ha ha Kun' });
    },

    goLogin: function (req, res) {

        res.render('login', { title: 'Login to your account...'});
    },

    login: function (req, res) {

        res.render('index');
        /*var username = req.getParameter("txtUsername");
        var password = req.getParameter("txtPassword");
        //code tìm:
        //var users = mongoose.model(User, usersSchema);
        //users.findOne({'username': 'username', 'password': password}, function (err, user) {
            if (username.length>0) {
                req.render('myblog', {username: username});
            } else {
                req.render('login', {error: "Username hoặc password không đúng."});
            }
        //})*/
    },

    goMyblog: function (req, res) {
        var username = 'Sẽ thay vô sau';
        res.render('myblog', { title: '' + username + ' - My Blog', username: username})
    }/*
     changeInformation: function (req, res) {
     var fullname = req.getParameter("txtFullname");
     var phone = req.getParameter("txtPhone");
     var email = req.getParameter("txtEmal");
     var avatar = req.getParameter("txtAvatar");
     //code update infomation
     },

     changePassword: function (req, res) {
     var oldPassword = req.getParameter("txtOldPassword");
     var newPassword = req.getParameter("txtNewPassword");
     var rePassword = req.getParameter("txtRePassword");
     if (oldPassword == "pass cũ từ database" && newPassword === rePassword) {
     //code update password
     }
     },

     insertPost: function (req, res) {
     var post = mongoose.model('Posts', postsSchema);
     var p = new post;

     p.title = "";
     p.content = "";
     p.date = new Date();
     p.category = "";
     p.tag = {
     tagsName: "1",
     tagsName: "2"
     };
     p.save(function (err, doc) {
     if (err) {
     res.render("posterror", {"error": "Kiểm tra lại."})
     } else {
     res.render("mybog");
     }
     });
     }*/
};

module.exports = function (router) {
    router.get('/', HomeController.index);
    router.get('/login.ejs', HomeController.goLogin);
    router.post('/login.ejs', HomeController.login);
    router.get('/myblog.ejs', HomeController.goMyblog);
    //router.get('/changeInformation', HomeController.changeInformation());
    return router;
};