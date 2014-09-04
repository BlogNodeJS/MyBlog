var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var categorysSchema = new Schema({
    _id: ObjectId,
    categoryName: String
});

var categorys = mongoose.model('categorys', categorysSchema);
module.exports = {categorys: categorys}