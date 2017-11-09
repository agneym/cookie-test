const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(morgan('dev'));

app.use(function (req, res, next) {
  var cookie = req.cookies.godCookie;
  if (cookie === undefined) {
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('godCookie', randomNumber, { maxAge: 60 * 60 * 24 * 7 });
    console.log('Cookie created successfully');
  }
  else {
    console.log('Cookie exists', cookie);
  }
  next();
});

app.get('/', (req, res)=>{
  res.status(200).json({'message': 'Hello World'});
});

const server = app.listen(3000);