var express         = require('express');
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');




var users           = require('./routes/users');

var app             = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.set('port', process.env.PORT || 3000);

var debug = require('debug')('my-application');

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

var socketio = require('socket.io');

var io=socketio.listen(server);




/*
 io.configure('development', function(){

 io.set('log level', 1);
 });

 */

io.sockets.on('connection', function(socket) {
    socket.on('event', function(event) {
        socket.join(event);
    });
});


var routes          = require('./routes/index_local')(app,io);



