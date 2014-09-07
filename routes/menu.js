/**
 * Created by Hihi on 27/08/2014.
 */
var express = require('express');
var router = express.Router();
var postsSchema = require('.../models/PostsSchema');
var categorysSchema = require('.../models/CategorysSchema');
var tagsSchema = require('.../models/TagsSchema');
var usersSchema = require('.../models/UsersSchema');

router.get('/', function (req, res) {
    usersSchema.users.findOne( function (errU, user) {
        if(user != null) {
            categorysSchema.categorys.find( function (errC, arrCategory) {
                if(arrCategory && arrCategory.length > 0) {
                    tagsSchema.tags.find( function(errT, arrTag) {
                        if(arrTag && arrTag.length > 0) {
                            postsSchema.posts.find().sort({date:-1}).limit(5).exec(function(err, arrNewPost){
                                res.render('bodyleft', {user: user, arrCategory: arrCategory, arrTag: arrTag, arrNewPost: arrNewPost});
                            });
                        }
                    });
                }
            });
        }

    });
});