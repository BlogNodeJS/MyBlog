var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorysSchema = new Schema({
    _it: Number,
    categoryName: String
});

var categorys = mongoose.model('categorys', categorysSchema);
module.exports = {categorys: categorys}