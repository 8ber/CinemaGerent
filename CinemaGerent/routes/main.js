var express = require('express');
var router = express.Router();
const apiDAL = require('../DAL/cinemagerentApiDAL')
const authBL = require('../BL/authBL')

router.get('/', async function(req, res) {
  if (!req.session.Login)
  { 
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else
  { 
    let stats = await apiDAL.getStats();
    let user = await authBL.getUserData(req.session.userId)
    res.render('main', {user, stats:stats.data});
  } 
});


module.exports = router;