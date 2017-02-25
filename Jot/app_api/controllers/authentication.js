var passport = require('passport');
var mongoose = require('mongoose');
var user = mongoose.model('User');

//this guy will be sending response (status and error msg).
var sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

//Validating the registrtion form.
module.exports.register = function(req, res){
    if(!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {"message":"All fields required"
    });
    return;
}

//new instance user model.
var user = new User();

//retreiving name and email from the request body
user.name = req.body.name;
user.email = req.body.email;

//Hash the password.
user.setPassword(req.body.password);

//save the user, send a jsonwebtoken and status  200
user.save(function(err){
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
        "token":token
    });
});
};

module.exports.login = function(reg, res){
    if(!req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {"message":"All fields required"
    });
    return;
}
passport.authenticate('local',function(err, user, info){
    if(err){
        res.status(404).json(err);
        return;
    };
    if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token":token
        });
    }else{
        //if user is not found
        res.status(401).json(info);
    }
})(req, res);

};
