'use strict';

var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy=require('passport-local').Strategy

var controller = require('../controllers/authentication.controller.');

var User = require("../models/user");

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

// Login Page
router.get("/", controller.index);

router.post("/signon", controller.signOn.post);

router.post("/signin", passport.authenticate("local", {successRedirect:'/io', failureRedirect:'/authentication',failureFlash:true}), controller.signIn.post);

router.get("/signout", controller.signOut.get);

router.get("/activateacout/_d/", controller.activateAccount.apiKey);

module.exports = router;
