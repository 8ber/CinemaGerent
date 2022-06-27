var express = require('express');
var router = express.Router();

const authBL = require('../BL/authBL')

router.get('/', function(req, res) {
  if (!req.session.Login)
  { 
    res.render('login', {"DisplayError":""});
  }
  else
  {
    res.redirect(`/main`)
  } 
}); 

router.post('/', async function(req, res) {
    let isFound = await authBL.login(req.body)
    if (isFound.loginStatus == true)
    { 
      req.session.Login = true;
      req.session.userId = isFound.id;
      req.session.currentUser = await authBL.getUserData(req.session.userId);
      req.session.cookie.maxAge = req.session.currentUser.sessiontimeout * 60000;
      res.redirect(`/main`)
    }
    else 
    {  
      req.session.Login = false;
      res.render('login', {"DisplayError":isFound});
    }
  });

module.exports = router;