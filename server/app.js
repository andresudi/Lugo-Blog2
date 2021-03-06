require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')

const request = require('request')
const rp = require("request-promise");

const crypto = require('crypto')
const Base64 = require('js-base64').Base64
const sha256 = require('js-sha256').sha256;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const DB_URL = {
  development: process.env.dbDev,
  test: process.env.dbTest
}

mongoose.connect(DB_URL[process.env.NODE_ENV], { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to blog db`);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter)

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

getToken()

module.exports = app;
