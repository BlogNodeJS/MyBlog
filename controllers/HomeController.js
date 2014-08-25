
var postsSchema = require('../models/PostsSchema');
var categorysSchema = require('../models/CategorysSchema');
var tagsSchema = require('../models/TagsSchema');
var usersSchema = require('../models/UsersSchema');

var homeController = {

    findAll: function (req, res ) {
        usersSchema.users.findOne( function (errU, user) {
            if(user != null) {
                categorysSchema.categorys.find( function (errC, arrCategory) {
                    if(arrCategory && arrCategory.length > 0) {
                        tagsSchema.tags.find( function(errT, arrTag) {
                            if(arrTag && arrTag.length > 0) {
                                postsSchema.posts.find().sort({date: -1}).exec( function(errP, arrPost){
                                    if(arrPost && arrPost.length > 0) {
                                        postsSchema.posts.find().sort({date:-1}).limit(5).exec(function(err, arrNewPost){
                                            res.render('home', {user: user, arrCategory: arrCategory, arrTag: arrTag, arrPost: arrPost, arrNewPost: arrNewPost});
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

    findPostById: function (req, res) {
        var id = parseInt(req.param('id'));
        postsSchema.posts.find({_id:id }, function(err, p){
            if(err == null) {
                if(p && p.length > 0) {
                    res.render('index', {arrPost: p});
                }
            }
        });
    },

    findPostByCategoryname: function (req, res) {
        var _categoryName = req.param('name');
        categorysSchema.categorys.find({category: _categoryName}, function(err, arrPost){
            if(arrPost && arrPost.length > 0){
                res.render('home', {arrPost: arrPost});
            }
        });
    }

};

module.exports = function (router) {
    router.get('/', homeController.findAll);
    router.get('/postDetail', homeController.findPostById);
    router.get('/postByCategoryname', homeController.findPostByCategoryname);

    return router;
};