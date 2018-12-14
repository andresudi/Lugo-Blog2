require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')

const request = require('request')
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

const client_id = "95ca7928-acde-4553-aef1-874cf2df9b9b"
const client_secret = "e48f35f1-dfa3-43bc-8c07-82bb1426c618"
const jogres = `${client_id}:${client_secret}`
const API_KEY = 'c8fafda0-0a8c-4c48-bcbb-d4988f2c63aa'

app.get('/bca', (req, res) => {
  request.post({ url: 'https://sandbox.bca.co.id/api/oauth/token', 
    headers: { Authorization: 'Basic ' + Base64.encode(jogres) }, 
    form: { grant_type: 'client_credentials' } }, function (err, httpResponse, body) {

      var accessToken = JSON.parse(body).access_token;

      var requestBody = {
          "MerchantID": "89000",
          "MerchantName": "Merchant One",
          "Amount": "100.22",
          "Tax": "0.0",
          "TransactionID": "156479",
          "CurrencyCode": "IDR",
          "RequestDate": "2015-04-29T09:54:00.234+07:00",
          "ReferenceID": "123465798"
      };

      var requestBody1 = ""

      console.log("==>",accessToken)

      var requestBodyReplace2 = JSON.stringify(requestBody)
      var requestBodyReplace = JSON.stringify(requestBody1).replace("\n", "").replace("\t", "").replace("\r", "").replace(" ", "")
      var requestBodyReplace3 = JSON.stringify(requestBody).replace('\n', '').replace('\t', '').replace('\r', '').replace(' ', '')

      console.log(" request body replace ===>", requestBodyReplace.replace("\n", "").replace("\t", "").replace("\r", "").replace(" ", ""))
      console.log("replace body 3 ===>", requestBodyReplace3)

      var hashedBySha256 = sha256(requestBodyReplace)
      var hashedBySha256__1 = sha256.hmac("key",requestBodyReplace)
      // var hashedBySha256__2 = sha256.hmac(key,requestBodyReplace)

      console.log("ini hasedBySha256 ---->", hashedBySha256)
      console.log("ini hasedBySha256__1 ---->", hashedBySha256__1)
      // console.log("ini hasedBySha256__2 ---->", hashedBySha256__2)

      //var sha256 = crypto.createHash('sha256').update(requestBodyReplace).digest("hex").toLowerCase()
      var timeStamp = new Date().toISOString()
      var stringHash = "GET:/va/payments?CompanyCode=10111&RequestID=201711101617000000700000000001:" + accessToken + ":" + hashedBySha256 + ":" + timeStamp;
      var key = '024e972d-62d2-4bf8-aafc-5862ae661446'

      var signature = crypto.createHmac('sha256', key).update(stringHash).digest('hex')
      var signature1 = crypto.createHmac('sha256', key).update(hashedBySha256).digest('hex')

      console.log('ini signtaure1 ---->', signature1)
      console.log('time stamp =====>', timeStamp)

      var options = {
          uri: 'https://sandbox.bca.co.id/sakuku-commerce/payments',
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + accessToken,
              'X-BCA-Key': 'b742f0fb-6970-4356-9faf-71d35b1295f4',
              'X-BCA-Timestamp': timeStamp,
              'X-BCA-Signature': signature1
          },
          json: requestBodyReplace
      }

      var options2 = {
          uri: 'http://:sandbox.bca.co.id/va/payments?CompanyCode=10111&RequestID=201711101617000000700000000001',
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-BCA-Key': API_KEY,
            'X-BCA-Timestamp': timeStamp,
            'X-BCA-Signature': hashedBySha256__1
          }
      }

      request(options2, function (error, response, body) {
          console.log("DAS IST ERROR", err)
          console.log("DAS IST RESPONSE", response)
          console.log("DAS IST BODY", body)

          res.send(body);
      })
  })
})

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
