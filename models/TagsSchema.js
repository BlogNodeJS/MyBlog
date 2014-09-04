var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var tagsSchema = new Schema({
    _id: ObjectId,
    tagsName: String
});

var tags = mongoose.model('tags', tagsSchema);
module.exports = {tags: tags};