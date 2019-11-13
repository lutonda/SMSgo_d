var User=require('../models/user')
var Mailer=require('../app/Mail.service')
exports.index = function(req, res, next) {
  res.render("authentication");
};

exports.signIn = {
  post: function(req, res) {
    res.redirect("/");
  }
};

exports.signOn = {
  post: function(req, res, next) {
    User.findOne({email:req.body.email},(err,user)=>{
      if(err)throw err;
      if(user){
        req.flash("success_error", "We already have ${user.email} email registered in our System, please try an other");
        res.render("authentication");
      }
      else
        User.create(new User(req.body), function(err, user) {
          if (err) throw err;
          console.log(user);
          user.emails=[user.email]
          user.subject='You SMSgo Account👻'
          user.activationUrl=req.protocol+'://'+req.hostname+'/authentication/activateacout/_d?_uJujkKey_bb='+user.apikey+'&980k=_22'
          Mailer.send(user);
          req.flash("success_msg", "You are registered and can you now login");
          res.redirect("/");
      });
    })
  }
};

exports.signOut = {
  get: function(req,res) {
    req.logOut();
    res.redirect("/authentication");
  }
}
exports.activateAccount = {
  apiKey: function(req,res) {
      User.getByApiKey(req.query._uJujkKey_bb,function(err,user){
        if(err)throw err
        if(user && !user.isActive){
            user.isActive=true;
            user.save

            req.logOut();
            res.redirect("/authentication?signin=0009");
        }else{
          req.flash("success_error", "Wrong key");
          res.redirect("/authentication");
        }
    })
  }
}
