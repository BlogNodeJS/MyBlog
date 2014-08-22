/**
 * Created by Hihi on 22/08/2014.
 */
var userSchema = require('../models/UsersSchema');

var loginController = {
    index: function(req, res) {
        res.render('login');
    },

    login: function (req, res ) {
        var _username = req.param.username;
        var _password = req.param.password;

        userSchema.users.findOne({username:'kun',password:'123456'}, function(err, result){
            if(err == null) {
                if(result.length > 0){
                    //success
                    alert('login success');
                    res.render('myblog', {username:_username});
                }else{
                    err = 1;
                    res.render('login', {error: err});
                }
            }
        })
    }
}

module.exports = function(router) {
    router.get('/', loginController.index);
    router.post('/login', loginController.login);
    return router;
}