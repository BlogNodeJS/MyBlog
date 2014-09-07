/**
 * Created by Hihi on 27/08/2014.
 */
var postsSchema = require('../models/PostsSchema');
var categorysSchema = require('../models/CategorysSchema');
var tagsSchema = require('../models/TagsSchema');
var usersSchema = require('../models/UsersSchema');

var menuController = function (req, res ) {
        usersSchema.users.findOne( function (errU, user) {
            if(user != null) {
                categorysSchema.categorys.find( function (errC, arrCategory) {
                    if(arrCategory && arrCategory.length > 0) {
                        tagsSchema.tags.find( function(errT, arrTag) {
                            if(arrTag && arrTag.length > 0) {
                                postsSchema.posts.find().sort({date: -1}).exec( function(errP, arrPost){
                                    if(arrPost && arrPost.length > 0) {
                                        postsSchema.posts.find().sort({date:-1}).limit(5).exec(function(err, arrNewPost){
//                                            res.render('home', {user: user, arrCategory: arrCategory, arrTag: arrTag, arrPost: arrPost, arrNewPost: arrNewPost});
                                            return user, arrCategory, arrTag, arrNewPost;
                                        });

                                    }
                                });
                            }
                        });
                    }
                });
            }

        });
}