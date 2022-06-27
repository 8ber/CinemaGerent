var express = require('express');
var router = express.Router();


const apiDAL = require('../DAL/cinemagerentApiDAL') 
const subscriptionBL = require('../BL/subscriptionBL')

router.get('/',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":""});
  }
  else
  {
    let data = await apiDAL.getAll();
    res.render('allSubscriptions', {user:req.session.currentUser,data:data.data});
  } 
});
router.post('/',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":""});
  }
  else
  { 
    console.log(req.body)
    let obj = req.body;
    await apiDAL.sendSubs(obj);
    let data = await apiDAL.getAll();

    res.render('allSubscriptions', {user:req.session.currentUser,data:data.data});
  } 
});


router.get('/edit/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else 
  {
    let subsToEdit = await subscriptionBL.getSubscriptions(req.params.id)
    res.render('editSubscription', {user: req.session.currentUser, subsToEdit});
  } 
});
router.post('/edit/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else 
  {
    await subscriptionBL.updateSubs(req.body)
    res.redirect('/subscriptions')
  } 
});



router.get('/addMember',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else
  {
    res.render('addSubscription', {user: req.session.currentUser});
  } 
});
router.post('/addMember',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else 
  {
    await subscriptionBL.addSubs(req.body)  
    res.redirect('/subscriptions')
  } 
});

router.get('/delete/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else if(req.session.currentUser.permissions.find(per=>per=="Delete Subscriptions"))
  {
    await subscriptionBL.deleteSubs(req.params.id)
    res.redirect('/subscriptions')
  } 
  else res.redirect('/subscriptions')
});
module.exports = router;
