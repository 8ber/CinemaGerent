var express = require('express');
var router = express.Router();

const authBL = require('../BL/authBL')

router.get('/', function(req, res) {
    res.render('createAccount',{"DisplayError":""})
});

router.post('/', async function(req, res) {
    let isMutable = await authBL.checkUser(req.body)
    if (isMutable == true)
    { 
      authBL.storePassword(req.body).then((x)=>{
        res.redirect(`/login`)
      })
    }
    else 
    { 
      res.render('createAccount',{"DisplayError":isMutable})
    }
  });

module.exports = router;