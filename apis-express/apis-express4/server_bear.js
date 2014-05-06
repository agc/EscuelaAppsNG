// server.js

// copiado de http://scotch.io/category/tutorials/javascript

// BASE SETUP
// =============================================================================

// paquetes necesarios
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');


// se usa para acceder en el servidor a los datos enviados mediante POST
app.use(bodyParser());

var port = process.env.PORT || 8080;


var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

mongoose.connect('mongodb://localhost:27017/nodetest2');

var Bear     = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware ejemplo, se usa en todos los requests
router.use(function(req, res, next) {

    console.log('Se ha realizado una operación.');
    next(); // nos aseguramos de ir a la otra ruta y de no pararse aquí
});

// ruta test, para asegurarse de que todo funciona
// se accede con (GET http://localhost:8080/api)

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// el resto de las rutas para el api


router.route('/bears')

    // creación de un   bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear(); 		// instancia del modelo Bear
        bear.name = req.body.name;  // desde el request al modelo

        //  guardar el modelo y chequeo de errores
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear creado!' });
        });

    })

    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


router.route('/bears/:bear_id')

    // obtener el bear con el id dado GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name; 	// actualizar el nombre

            // guardarlo
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear actualizado!' });
            });

        });
    })

    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Borrado con éxito' });
        });
    });

// REGISTRO DE LAS RUTAS -------------------------------
// todas las rutas con prefijo  /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
// el codigo se ha llevado a bin/www2

// app.listen(port);
// console.log('Magic happens on port ' + port);

module.exports = app;
