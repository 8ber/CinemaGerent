var express = require('express');
var router = express.Router();
const authBL = require('../BL/authBL')
const usersDataBL = require('../BL/usersDataBL')

// surf to /users
router.get('/',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":""});
  }
  else if (req.session.userId === '6293362c2deb85a53e109a2f')
  {
    let allUsersData = await usersDataBL.getUsers();
    res.render('allUsers', {user:req.session.currentUser, allUsersData:allUsersData});
  } 
});

// /surf to /edit/ID
router.get('/edit/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else if (req.session.userId === '6293362c2deb85a53e109a2f')
  {
    let userToEdit = await usersDataBL.getUser(req.params.id)
    res.render('editUser', {user: req.session.currentUser, userToEdit: userToEdit, allPermissions: ["View Subscriptions","Create Subscriptions","Delete Subscriptions","Update Subscriptions","View Movies","Create Movies","Delete Movies","Update Movies"]});
  } 
});

// post /edit/ID data to the server
router.post('/edit/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else if (req.session.userId === '6293362c2deb85a53e109a2f')
  {
    let userToEdit = req.body
    userToEdit.sessiontimeout = parseInt(req.body.sessiontimeout)
    await usersDataBL.updateUser(userToEdit)
    res.redirect('/users')
  } 
});

// /surf to /addUser
router.get('/addUser',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else if (req.session.userId === '6293362c2deb85a53e109a2f')
  {
    res.render('addUser', {user: req.session.currentUser, allPermissions: ["View Subscriptions","Create Subscriptions","Delete Subscriptions","Update Subscriptions","View Movies","Create Movies","Delete Movies","Update Movies"]});
  } 
});

// post /addUser/ID data to the server
router.post('/addUser',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else if (req.session.userId === '6293362c2deb85a53e109a2f')
  {
    let userToAdd = req.body
    userToAdd.sessiontimeout = parseInt(req.body.sessiontimeout);
    await usersDataBL.addUser(userToAdd)  
    res.redirect('/users')
  } 
});

// surf to /delete/ID
router.get('/delete/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else if (req.session.userId === '6293362c2deb85a53e109a2f')
  {
    await usersDataBL.deleteUser(req.params.id)
    res.redirect('/users')
  } 
});

module.exports = router;
