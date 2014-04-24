var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

/*

El archivo rutas/index.js requiere main.js y locations.js

El archivo locations.js define las rutas, para ello requiere los archivos

adverts.js brands.js countries.js que

exportan las funciones usadas en la definición de las rutas

 */






app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '/app_server/views'));
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'app_server/app_ng')));


});


require('./rutas')(app); /* Las rutas después de la configuración */


http.createServer(app).listen(app.get('port'), function () {
    console.log("Servidor Express a la escucha en puerto " + app.get('port'));
});