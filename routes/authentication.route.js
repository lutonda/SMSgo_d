'use strict';

var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    LocalStrategy=require('passport-local').Strategy,
    GitHubStrategy = require('passport-github').Strategy;

var controller = require('../controllers/authentication.controller.');
var User = require("../models/user");

var GITHUB_CLIENT_ID='332445fb159186fe0cfa';
var GITHUB_CLIENT_SECRET='b862f87fee8a498c7975627391a5810077a800ef';
var CALLBACK_URL= "https://8800-a6d0d9e8-c7c3-4a20-b6f8-5d76d853a2ab.ws-eu01.gitpod.io/authentication/github/callback";

passport.use(new LocalStrategy(function(email,password,done){
  User.getByUsername(email,function(err,user){
    if(err) throw err;
    if(!user)
      return done(null, false,{message:'Unknow User'})
    
      User.comparePassword(password,user.password,function(err,isMatch){
        if(err) throw err;
        if(isMatch)
          return done(null, user)
        else
          return done(null,false, { message:'wrong password'})
      })
  })
}))

passport.serializeUser(function(user,done){
  done(null,user.id);
})

passport.deserializeUser(function(id,done){
  User.getById(id,function(err,user){
    done(err,user);
  })
})


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
        var newUser=new User(
            {
                email:profile.emails[0].value,
                name:profile.displayName,
                username:profile.username,
                password:Math.random().toString(36).substring(7),
                isActive:true
            });
    User.findOne({email:newUser.email},(err,user)=>{
        console.log(newUser);
      if(err)throw err;
      if(user){
        return cb(err, user);
      }
      else
        user=User.create(newUser, function(err, user) {
          return cb(err, user);
      });       
    })
  }
));

// Login Page
router.get("/", controller.index);

router.post("/signon", controller.signOn.post);

router.post("/signin", passport.authenticate("local", {successRedirect:'/io', failureRedirect:'/authentication',failureFlash:true}), controller.signIn.post);

router.get("/signout", controller.signOut.get);

router.get("/activateacout/_d/", controller.activateAccount.apiKey);

module.exports = router;
