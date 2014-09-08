
var postsSchema = require('../models/PostsSchema');
var categorysSchema = require('../models/CategorysSchema');
var tagsSchema = require('../models/TagsSchema');
var usersSchema = require('../models/UsersSchema');

var errors = null;
var homeController = {

    findAll: function (req, res ) {
        usersSchema.users.find( function (errU, user) {
            if(user != null) {
                req.session.Users = user;
                categorysSchema.categorys.find( function (errC, arrCategory) {
                    if(arrCategory && arrCategory.length > 0) {
                        req.session.Categorys = arrCategory;
                        tagsSchema.tags.find( function(errT, arrTag) {
                            if(arrTag && arrTag.length > 0) {
                                req.session.Tags = arrTag;
                                postsSchema.posts.find().sort({date: -1, _id: -1}).exec( function(errP, arrPost){
                                    if(arrPost && arrPost.length > 0) {
                                        req.session.Posts = arrPost;
                                        postsSchema.posts.find().sort({date:-1, _id: -1}).limit(5).exec(function(err, arrNewPost){
                                            req.session.NewPosts = arrNewPost;
                                            res.render('home', {username: req.session.username, user: user, arrCategory: arrCategory, arrTag: arrTag, arrPost: arrPost, arrNewPost: arrNewPost});
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },



    findInsert: function (req, res) {
//        var id = parseInt(req.param('id'));
        usersSchema.users.find(function (err, p) {
            if (err == null) {
                if (p && p.length > 0) {
                    categorysSchema.categorys.find(function (err, post) {
                        if (err == null) {
                            if (post && post.length > 0) {
                                res.render('postAdd', {username: req.session.username,arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });
                            }
                        }
                    });
                }
            }
        });
    },

    insert: function (req, res) {

        var dateNow = new Date();
        var dd = dateNow.getDate();
        var monthSingleDigit = dateNow.getMonth() + 1,
            mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
        var yy = dateNow.getFullYear().toString().substr(2);

        var formattedDate = dd + '/' + mm + '/' + yy;

        var i = req.body.displayName;
        var f = req.body.full;
        var pone = req.body.phone;
        var e = req.body.email;
        var av = req.body.avatar;
        var ab = req.body.about;

        var ars = [];
        ars[0] = i;
        ars[1] = f;
        ars[2] = pone;
        ars[3] = e;
        ars[4] = av;
        ars[5] = ab;


        var str = req.body._tags;
        var arrs = str.split(",");

        for (var x in arrs)
        {
            new tagsSchema.tags({
                _id:null,
                tagsName: arrs[x]

            }).save(function (err, u, count) {


                });
        }

        new postsSchema.posts({

            _id:null,
            title: req.body._title,
            image: req.files._image.name,
            description: req.body._description,
            content: req.body._content,
            date: formattedDate,
            category: req.body.tags_,
            tags: arrs,
            user: ars
        }).save(function (err, u, count) {
                res.redirect('postAdd');
            });
    },


    findPostByIdEdit: function (req, res) {
        var id = req.param('id');
        postsSchema.posts.find({_id: id }, function (err, p) {
            if (err == null) {
                if (p && p.length > 0) {
                    categorysSchema.categorys.find(function (err, post) {
                        if (err == null) {
                            if (post && post.length > 0) {
                                res.render('postEdit', {username: req.session.username,arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });
                            }
                        }
                    });
                }
            }
        });
    },


    findPostByIdAndUpdate: function (req, res) {
        var id = req.param('id');
        var title = req.body._title;
        var image;
        if(req.files.hinh){
            image = req.files.hinh.name;
        }else{
            image = req.body._image;
        }

        var description = req.body._description;
        var content = req.body._content;
        var category = req.body.tags_;
        var tag=req.body._tags;
        postsSchema.posts.update({_id: id}, {$set: {title: title, image: image, description: description, content: content, category: category,tag:tag}}, function (err, result) {
            if (err == null) {
                if (result) {
                    res.redirect('/');
                } else {
                }
            }
        });
    },

    findPostById: function (req, res) {
        var id = req.param('id');
        postsSchema.posts.find({_id: id }, function(err, p){
            if(err == null) {
                if(p && p.length > 0) {
                    res.render('postDetails', {username: req.session.username, arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts } );
                }
            }
        });
    },

    findPostByName: function( req, res ){
        var _name = req.param('name').trim();
        postsSchema.posts.find({ title: _name }, function(err, p){
            if(p && p.length > 0){
                res.render('postDetails', {username: req.session.username,arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });
            }
        });
    },

    goSearch: function(req, res){
        var search = req.param('txtSearch');
        postsSchema.posts.find({title: {$regex: search, $options: 'i'}}, function(err, p){
            if(err == null && p && p.length > 0){
                res.render('searchPost', {username: req.session.username,arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });
            }else {
                res.render('searchPost', {username: req.session.username,arrPost: null, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts, notification: "Không tìm thấy bài viết."});
            }
        });
    },

    searchPost: function (req, res) {
        var search = req.param('txtSearch');
        postsSchema.posts.find({title: {$regex: search, $options: 'i'}}, function(err, p){
            if(err == null && p && p.length > 0){
                res.render('searchPost', {username: req.session.username,arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });
            }else {
                res.render('searchPost', {username: req.session.username,arrPost: null, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts, notification: "Không tìm thấy bài viết."});
            }
        });
    },

    findPostByCategoryname: function (req, res) {
        var _categoryName = req.param('name');
        postsSchema.posts.find({category: _categoryName}, function(err, p){
            if(p && p.length > 0){
                res.render('categoryDetails', {username: req.session.username,arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });
            }else{
                res.render('categoryDetails', {username: req.session.username,arrPost: null, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts, notification: "Không có bài viết thuộc chuyên mục này."});
            }
        });
    },

    findPostByTags: function (req, res){
        var _tag = req.param('name');
        postsSchema.posts.find({ tags: _tag }, function(err, p){
            if(p && p.length > 0){
                res.render('tagDetails', {username: req.session.username,arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });
            }else{
                res.render('tagDetails', {username: req.session.username,arrPost: null, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts, notification: "Không có bài viết nào chứa tags này."});
            }
        });
    },

    getLogin: function(req, res) {
        res.render('login', {errors: ""});
    },

    login: function (req, res ) {
        var _username = req.param('txtUsername');
        var _password = req.param('txtPassword');

        usersSchema.users.findOne({username:_username,password:_password}, function(err, result){
            if(err == null) {
                if(result != null){
                    //success
                    req.session.username = _username;
                    res.render('home', {username:req.session.username  ,arrPost: req.session.Posts, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });
                }else {
                    errors = 'Đăng nhập thất bại ! Tài khoản hoặc Mật khẩu không đúng';
                    res.render('login', {errors: errors});

                }
            }
        });
    },

    logout: function(req, res){
        res.render('home', {username:null ,arrPost: req.session.Posts, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts, errors: "" });
    },
    findCategory: function(req,res){

        usersSchema.users.find(function (err, p) {
            if (err == null) {
                if (p && p.length > 0) {
                    categorysSchema.categorys.find(function (err, post) {
                        if (err == null) {
                            if (post && post.length > 0) {

                                res.render('createNewCategory', {username: req.session.username,arrPost: p, user: req.session.Users, arrCategory: req.session.Categorys, arrTag: req.session.Tags, arrNewPost: req.session.NewPosts });

                            }
                        }
                    });


                }
            }
        });


    },


    insertCategory: function(req,res) {
        var _categoryName = req.body.ten;
        new categorysSchema.categorys({
            _id:null,
            categoryName:_categoryName
        }).save(function(err){
                if(! err){
                    res.redirect('/');
                }
            });
    }
};

module.exports = function (router) {
    router.get('/', homeController.findAll);
    router.get('/postDetail', homeController.findPostById);
    router.get('/postByName', homeController.findPostByName);
    router.get('/postByTags', homeController.findPostByTags);
    router.get('/postByCategoryname', homeController.findPostByCategoryname);
    router.post('/searchPost', homeController.searchPost); //
    router.get('/searchPost', homeController.goSearch); //
    router.get('/login', homeController.getLogin);
    router.post('/login', homeController.login);
    router.get('/logout', homeController.logout);
    router.get('/postAdd',homeController.findInsert);
    router.post('/postAdd',homeController.insert);
    router.get('/postEdit',homeController.findPostByIdEdit);
    router.post('/postEdit',homeController.findPostByIdAndUpdate);
    router.get('/createNewCategory',homeController.findCategory);
    router.post('/createNewCategory',homeController.insertCategory);
    return router;
};