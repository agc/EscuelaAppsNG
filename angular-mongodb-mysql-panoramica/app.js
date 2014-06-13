var express             = require('express');
var path                = require('path');
var favicon             = require('static-favicon');
var logger              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*"); //config.allowedDomains
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


var app = express();

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('.html', require('jade').__express);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(allowCrossDomain)

var vistas_publicas     =path.join(__dirname,'/public/vistas/')

require('./routes')(app,vistas_publicas)





module.exports = app;
