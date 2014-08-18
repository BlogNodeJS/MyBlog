/**
 * Created by Hell Angel on 8/18/2014.
 */

var HomeController = {
    index:function(req, res){

    },
    login:function(req, res){

        var username = req.getParameter("txtUsername");
        var password = req.getParameter("txtPassword");

        
    }
};



module.exports = function(router){
    router.get('/',HomeController.index);
    router.post('/login',HomeController.login);
    return router;
};