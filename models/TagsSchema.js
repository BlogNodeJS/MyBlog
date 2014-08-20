var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagsSchema = new Schema({
    _it: String,
    tagsName: String
});