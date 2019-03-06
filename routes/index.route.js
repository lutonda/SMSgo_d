var express = require('express');
var router = express.Router();
var passport = require('passport');
// Load User model
// Login Page
router.get('/',ensureAutentication, function(req, res){ 
    
    req.flash("success_msg", "You are registered and can you now login");
    req.flash('info', 'Flash is back!')
    res.render('index')});

function ensureAutentication(req,res,next){
    if(req.isAuthenticated())
        next();
    else
        res.redirect('/authentication');
}

module.exports = router;