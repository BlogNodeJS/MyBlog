var usersSchema = new mongoose.Schema({
    _it: int,
    username: String,
    password: String,
    fullname: String,
    phone: String,
    email: String,
    avatar: String
});