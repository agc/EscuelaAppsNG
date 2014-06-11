var express         = require('express');
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var consolidar      = require('consolidate')
var app             = express();

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', consolidar.ejs)
app.engine('jade',consolidar.jade)

app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require('./routes/')(app)



module.exports = app;
