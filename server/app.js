var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
const NODE_ENV = process.env.NODE_ENV || 'development'
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogporto_' + NODE_ENV, {useNewUrlParser : true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongoDB via mongoose')
});

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);


module.exports = app;
