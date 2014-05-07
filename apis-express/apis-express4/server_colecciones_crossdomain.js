// server.js

// copiado de http://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/


var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoskin  = require('mongoskin')
var port       = process.env.PORT || 8080;




app.use(bodyParser());

app.use(express.static(__dirname + '/public'));



app.use(function(req, res, next) {

    console.log('Se ha realizado una operación.');
    next();
});



app.get('/restangular2', function(req, res) {
    res.sendfile('./public/restangular2.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/', function(req, res) {
    res.json({ message: 'seleccionar una coleccion, ej /api/bears!' });
})





module.exports = app;
