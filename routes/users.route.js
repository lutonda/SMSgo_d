var express = require('express');
var router = express.Router();

var controller = require('../controllers/user.controller');

// Load User model
// Login Page
router.get('/', doAutentication, controller.index);

router.get('/:user', ensureAutentication, controller.index);

router.get('/:user/api', ensureAutentication,controller.api);
    
router.post('/:user/apijob', ensureAutentication, controller.job);

router.get('/:user/station/connect/station', ensureAutentication, controller.stationConnect);
                
function ensureAutentication(req,res,next){
    if(req.isAuthenticated())
        next();
    else
        res.redirect('/authentication');
}
function doAutentication(req,res,next){
    if(req.isAuthenticated())
        res.redirect('/io/'+req.user.name);
    else
        res.redirect('/authentication');
}

module.exports = router;