var express = require('express');
var path = require('path');
var http = require('http');



var app = express();

var config = require('./config.js');
var passport = require('passport');
var security = require('./lib/security');







app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '/app_server/views'));
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
    app.use(express.cookieSession());                           // Store the session in the (secret) cookie
    app.use(passport.initialize());                             // Initialize PassportJS
    app.use(passport.session());                                // Use Passport's session authentication strategy - this stores the logged in user in the session and will now run on any request

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'app_server/app_ng')));



});

security.initialize(config.mongo.dbUrl, config.mongo.apiKey, config.security.dbName, config.security.usersCollection); // Add a Mongo strategy for handling the authentication
require('./rutas/security').addRoutes(app, security);
require('./rutas')(app); /* Las rutas después de la configuración */


http.createServer(app).listen(app.get('port'), function () {
    console.log("Servidor Express a la escucha en puerto " + app.get('port'));
});