var express = require('express');
var router = express.Router();

var controller = require('../controllers/home.controller');

// Load User model
// Login Page
router.get('/', controller.index);

router.get('/api', controller.api);
    
router.get('/about', controller.about);

router.get('/project', controller.project);
      
module.exports = router;