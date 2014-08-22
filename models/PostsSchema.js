var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
    _id: Number,
    title: String,
    image: String,
    description: String,
    content: String,
    date: String,
    category: String,
    tags: Object,
    user: Object
});

var posts = mongoose.model('posts', postsSchema);

module.exports = {posts: posts};