// server.js

// copiado de http://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/


var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var port       = process.env.PORT || 8080;




app.use(bodyParser());

app.use(express.static(__dirname + '/public'));



app.use(function(req, res, next) {

    console.log('Se ha realizado una operación.');
    next();
});



app.get('/news', function(req, res) {
    res.sendfile('./public/indexnews.html');
});

app.get('/', function(req, res) {
    res.json({ message: 'seleccionar una coleccion, ej /api/bears!' });
})





module.exports = app;