// copiado de http://plnkr.co/edit/d6yDka?p=preview


var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');




var router      = express.Router();

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));


app.use(function (req, res, next) {
    console.log('Se ha realizado una operación.');
    next();
});


app.get('/', function (req, res) {
    res.json({ message: 'algunar rutas /ejemplos/restangular1' });
})

// se invoca como archivo estatico no con esta ruta

router.route('/ejrestang1')

    .get( function (req, res) {
        res.sendfile('./public/ejrestangular1.html');
    });

router.route('/ejgraina')

    .get( function (req, res) {
        res.sendfile('./public/ejgraina.html');
    });

// si definimos app.use('/ejemplos',router)
// si lo servimos asi busca los elementos  precedidos por la ruta /ejemplos
// por ello app.use('/',router)
app.use('/',router)

module.exports = app;
