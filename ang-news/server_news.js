
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var port       = process.env.PORT || 8080;




app.use(bodyParser());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app'));



app.use(function(req, res, next) {

    console.log('Se ha realizado una operación.');
    next();
});

var router = express.Router();

require('./rutas_rest_mongoose')('/api',router,app);

app.get('/news', function(req, res) {
    res.sendfile('./app/indexnews.html');
});

app.get('/', function(req, res) {
    res.json({ message: 'seleccionar una coleccion, ej /api/bears!' });
})





module.exports = app;