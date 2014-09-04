var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var postsSchema = new Schema({
    _id: ObjectId,
    title: String,
    image: String,
    description: String,
    content: String,
    date: String,
    category: String,
    tags: [],
    user: []
});

var posts = mongoose.model('posts', postsSchema);

module.exports = {posts: posts};