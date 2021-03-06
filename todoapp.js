var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var globals = require('./globals');
var debug = require('debug')(globals.appName);
var routes = require('./routes/index');
var users = require('./routes/todos');

// connect to db

var data = fs.readFileSync('./mongo_creds.json'),
    mongoCreds;
try {
    mongoCreds = JSON.parse(data);
    debug(mongoCreds);
} catch (err) {
    console.log('Could not parse mongo_creds.json.');
    console.log(err);
}
mongoose.connection.on("open", function () {
  debug('connected to mongo db');
});
mongoose.connect(
    'mongodb://' + mongoCreds.username +
    ':' + mongoCreds.password +
    '@' + mongoCreds.host +
    ':' + mongoCreds.port +
    '/' + mongoCreds.dbname);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/todos', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    debug('request did not match any routes');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

app.use(function(err, req, res, next) {
    debug('Error occured');
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


module.exports = app;
