var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
    _it: Number,
    title: String,
    content: String,
    date: String,
    category: String
});