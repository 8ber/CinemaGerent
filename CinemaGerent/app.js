var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var subscriptionsRouter = require('./routes/subscriptions');
var createAccountRouter = require('./routes/createAccount');
var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');


require('./configs/mongoose')

var app = express();
app.use(session({
  secret: 'TryME',
  resave: false,
  rolling: false,
  saveUninitialized: false,
  cookie: { secure: false,
  httpOnly: true,
  maxAge: 60*1000 * 30} //just a default value. is sets up as the user logs in.
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/createAccount', createAccountRouter);
app.use('/main', mainRouter)
app.use('/subscriptions', subscriptionsRouter);
app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
