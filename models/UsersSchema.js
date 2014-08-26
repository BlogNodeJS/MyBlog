var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    _it: Number,
    username: String,
    password: String,
    fullname: String,
    phone: String,
    email: String,
    avatar: String,
    aboutMe: String
});

var users = mongoose.model('users', usersSchema);
module.exports = {users: users};