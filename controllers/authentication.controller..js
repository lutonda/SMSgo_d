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
    req.body.avatar='data:image/png;base64,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'
    User.findOne({email:req.body.email},(err,user)=>{
      if(err)throw err;
      if(user){
        console.log(req.body.email)
        console.log('success_error", "We already have ${user.email} email registered in our System, please try an other')
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
