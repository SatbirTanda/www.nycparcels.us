'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var robots = require('robots.txt')

var index = require('./routes/index');
var api = require('./routes/api');
var app = express();


var url = process.env.MONGODB_URI;
// ENV
try {
    var config = require('./env.json');
    url = process.env.MONGODB_URI || config.MONGODB_URI;
}
catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
        console.log("CANNOT LOAD env.json");
    }
}

mongoose.connect(url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(require('prerender-node').set('prerenderToken', 'hH20aiVEreEmlM5dWuIF'));
app.use(robots(__dirname + '/robots.txt'));

app.use('/', index);
app.use('/api', api);

// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/components/index/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end(JSON.stringify({ error: err.message }));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end(JSON.stringify({ error: err.message }));
});


module.exports = app;
