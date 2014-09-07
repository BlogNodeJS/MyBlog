/**
 * Created by phongnguyen on 8/25/2014.
 */
var userSchema = require('../models/UsersSchema');
var postsSchema = require('../models/PostsSchema');


var aboutController = {



    findUser: function (req, res) {
        userSchema.users.find( function(err,arrUsers){
            if(err == null) {
                if(arrUsers && arrUsers.length > 0) {
                    res.render('about', {
                        title: 'Express Todo Example',

                        username: req.session.username, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrPost: req.session.Posts, arrNewPost:req.session.NewPosts

                    });
                }
            }
        });
    },

    update: function (req, res) {
        var id = req.body.id;
        var full = req.body.fullname_;
        var phone = req.body.phone_;
        var email = req.body.email_;
        var about = req.body.about_;
        var image=req.body.image_;
        var display=req.body.user;
        var user=req.body.username;
        userSchema.users.update({_id: id}, {$set: {displayName:display, fullname: full, phone: phone, email: email, aboutMe: about, avatar:image}}, function (err, result) {
            if (err == null) {
                if (result) {


                    postsSchema.posts.update({user:user}, {$set: {"user": [user, display, full, phone, email, image, about]}}, {multi: true}, function(err, result){

                        userSchema.users.find( function(err,arrUsers){
                            if(err == null) {
                                if(arrUsers && arrUsers.length > 0) {
                                    res.render('about', {
                                        title: 'Express Todo Example',
                                        arrUsers: arrUsers,username: req.session.username,
                                        notification: 'Đổi thông tin thành công!'});
                                }
                            }
                        });


                    });


                } else {


                }
            }
        });


    },
    findUserById: function (req, res) {

        userSchema.users.find( function(err,arrUsers){
            if(err == null) {
                if(arrUsers && arrUsers.length > 0) {
                    res.render('aboutDetail', {
                        title: 'Express Todo Example',
                        username: req.session.username, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrPost: req.session.Posts, arrNewPost:req.session.NewPosts});
                }
            }
        });


    },

    insert: function (req, res) {
      new userSchema.users({
           _id: req.body.ids,
          fullname : req.body.full,
          aboutMe: req.body.edit
      }).save( function( err, u, count ){
              res.redirect( '/' );
          });

    },
    updatePass: function (req, res) {
        var username = req.param('userna');
        var oldPassword = req.param('txtOldPassword');
        var newPassword = req.param('txtNewPassword');
        var rePassword = req.param('txtRePassword');

        if (newPassword == rePassword) {
            userSchema.users.update({username: username, password: oldPassword}, {$set: {password: newPassword}}, function (err, result) {
                if (result) {

                        res.render('aboutDetail', {username: req.session.username,notification: 'Đổi mật khẩu thành công!'});

                }
                if (!result) {
                    res.render('aboutDetail', {username: req.session.username,notification: 'Mật khẩu cũ không đúng!'});
                }

            })
        } else {
            res.render('aboutDetail', {username: req.session.username,notification: 'Mật khẩu mới không trùng khớp.'});
        }
    }


}

module.exports = function(router) {
    router.get('/', aboutController.findUser);
    router.post('/', aboutController.update);
    router.get('/aboutDetail', aboutController.findUserById);
    router.post('/aboutDetail', aboutController.updatePass);
//    router.post('/aboutDetail',aboutController.insert);

//    router.get('/about', aboutController.findUser);
    return router;
}