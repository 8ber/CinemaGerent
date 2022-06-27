var express = require('express');
var router = express.Router();

const authBL = require('../BL/authBL')
const usersDataBL = require('../BL/usersDataBL')
const apiDAL = require('../DAL/cinemagerentApiDAL') 
const movieBL = require('../BL/movieBL')
//surf to /movies
router.get('/',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":""});
  }
  else
  {
    let data = await apiDAL.getAll();
    res.render('allMovies', {movieToSearch: "",user:req.session.currentUser,data:data.data});
  } 
});

//surf to /movies/SEARCH-MOVIE-NAME
router.get('/:movieName',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":""});
  }
  else
  {
    let data = await apiDAL.getAll();
    res.render('allMovies', {movieToSearch: req.params.movieName,user:req.session.currentUser,data:data.data});
  } 
});

// /surf to /edit/ID
router.get('/edit/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else 
  {
    let movieToEdit = await movieBL.getMovie(req.params.id)
    res.render('editMovie', {user: req.session.currentUser, movieToEdit});
  } 
});

// post /edit/ID data to the server
router.post('/edit/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else
  {
    let movieToEdit = req.body
    movieToEdit.genres = movieToEdit.genres.split(",")
    await movieBL.updateMovie(movieToEdit);
    res.redirect('/movies')
  } 
});

// /surf to /add/movie
router.get('/add/movie',async function(req, res) {
  if (!req.session.Login)
  {  

    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else
  {
    res.render('addMovie', {user: req.session.currentUser});
  } 
});

// post /addMovie/ID data to the server
router.post('/addmovie',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else
  {
    let movieToAdd = req.body
    movieToAdd.genres = movieToAdd.genres.split(",")
    await movieBL.addMovie(movieToAdd);  
    res.redirect('/movies')
  } 
});

// surf to /delete/ID
router.get('/delete/:id',async function(req, res) {
  if (!req.session.Login)
  {  
    res.render('login', {"DisplayError":"Content restricted, Please login."});
  }
  else if(req.session.currentUser.permissions.find(per=>per=="Delete Movies"))
  {
    await movieBL.deleteMovie(req.params.id)
    res.redirect('/movies')
  } 
  else res.redirect('/movies')
});


module.exports = router;
