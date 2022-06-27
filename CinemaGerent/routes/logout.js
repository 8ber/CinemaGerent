var express = require('express');
var router = express.Router();

const authBL = require('../BL/authBL')

router.get('/', function(req, res) {
  if (req.session.Login)
  { 
    req.session.Login = false;
    res.render('login', {"DisplayError":"Logged out."});
  }
  else
  {
    res.render('login', {"DisplayError":""});
  } 
});


module.exports = router;