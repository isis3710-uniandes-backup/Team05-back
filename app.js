var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

// api routes
var reinos = require('./routes/reinos');
var colectores = require('./routes/colectores');
var clases = require('./routes/clases');


var app = express();

// connect to MongoDB Atlas
var dbName = 'bioAndes';
var connectionString = `mongodb://bioAndes1:esto_es_bioAndes1@cluster0-shard-00-00-d8fao.mongodb.net:27017,cluster0-shard-00-01-d8fao.mongodb.net:27017,cluster0-shard-00-02-d8fao.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

mongoose.connect(connectionString, { useNewUrlParser: true });

// api endpoints
app.use('/api', reinos);
app.use('/api', colectores);
app.use('/api', clases);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
