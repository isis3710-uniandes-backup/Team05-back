var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

// api routes
const reinos = require('./routes/reinos');
const colectores = require('./routes/colectores');
const clases = require('./routes/clases');
const ordenes = require('./routes/ordenes');
const lugares = require('./routes/lugares');


var app = express();

// connect to MongoDB Atlas
var dbName = 'bioandes';
var connectionString = `mongodb://bioandes:clave_bioandes1@ds261247.mlab.com:61247/${dbName}`;
// var connectionString = `mongodb://bioandes1:esta_es_1a_clave@cluster0-shard-00-00-d8fao.mongodb.net:27017,cluster0-shard-00-01-d8fao.mongodb.net:27017,cluster0-shard-00-02-d8fao.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

mongoose.connect(connectionString, { useNewUrlParser: true });

// app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// api endpoints
app.use('/api', reinos);
app.use('/api', colectores);
app.use('/api', clases);
app.use('/api', ordenes)
app.use('/api', lugares);

module.exports = app;
