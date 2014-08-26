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
        var t = '<p><span style="font-size: x-large;"><strong>aaaaaaaaaaaa</strong></span></p>' +
            '<p><span style="font-size: x-large;"><em>bbbbbbbbbbbbbbb</em></span></p><p><span style="font-size: x-large;"><em><span style="font-size: x-large;">ccccccccccccccccc<br /></span></em></span></p>';
        res.render('index', { title: 'Trang index nè...', caba: t.toString() });
    },

    indexSubmit: function (req, res){

        res.render('test', { text: 'Hihi test.ejs'});
    },

    goLogin: function (req, res) {

        res.render('login', { title: 'Login to your account...'});
    },

    login: function (req, res) {

        var x = req.param('txtUsername');
        res.render('myblog', {title: 'Đã login...', text: x});
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
    },
    home: function (req, res) {
        res.render('home');
    },

    test: function (req, res) {

        res.render('test', {text: 'abc'});
    },
    test2: function (req, res) {

        res.render('test', {text: 'abccccccccccccccccc'});
    },
    textEditor: function (req, res){
        res.render('textEditor');
    },
    update: function (req, res){
        var id = req.param('txtID');
        var title = req.param('editor1');

    }
    /*
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
     },*/

    /*insertPost: function (req, res) {
     var post = mongoose.model('Posts', postsSchema);
     var p = new post;

     p.title = "";
     var c = req.getParameter("tetContent").trim();
     c = c.replace("&#34;","&#39;");
     p.content = c;
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
    //router.post('/', HomeController.indexSubmit);

    router.get('/login.ejs', HomeController.goLogin);
    router.post('/login', HomeController.login);

    router.get('/myblog.ejs', HomeController.goMyblog);

    router.get('/home.ejs', HomeController.home);

    router.get('/test.ejs', HomeController.test);
    router.post('/', HomeController.test2);
    //router.get('/changeInformation', HomeController.changeInformation());
    router.get('/textEditor.ejs', HomeController.textEditor);
    router.post('/textEditor', HomeController.update);
    return router;
};