/**
 * Created by Hihi on 22/08/2014.
 */
var userSchema = require('../models/UsersSchema');
var errors = null;
var loginController = {
    index: function(req, res) {
        res.render('login', {errors: errors});
    },

    login: function (req, res ) {
        var _username = req.param('txtUsername');
        var _password = req.param('txtPassword');

        userSchema.users.findOne({username:_username,password:_password}, function(err, result){
            if(err == null) {
                if(result != null){
                    //success
                    req.session.username = _username;
                    res.render('home');
                }else {
                    errors = 'Đăng nhập thất bại ! Tài khoản hoặc Mật khẩu không đúng';
                    res.render('login', {errors: errors});

                }
            }
        });
    }
}

module.exports = function(router) {
    router.get('/', loginController.index);
    router.post('/', loginController.login);
    return router;
}