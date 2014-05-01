
require('./conexion/conexion_tarpen');
require('./models/def_model_tarpen');

var express     = require('express');
var rutas       = require('./routes/tarpen/rutastarpen');
var http        = require('http');
var path        = require('path');
var app         = express();
var engine      =require('ejs-locals');



// all environments
app.set('port', process.env.PORT || 3000);
app.engine('ejs',engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(rutas.current_user);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}



// Se pasa la función, no se ejecuta aquí sino que
// como es un callback será ejecutada cuando se reciba la petición

app.get('/', rutas.index);
app.get('/destroy/:id',rutas.destroy);
app.post('/create',rutas.create);
app.get( '/edit/:id', rutas.edit );
app.post( '/update/:id', rutas.update );


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
