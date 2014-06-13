var express             = require('express');

var logger              = require('morgan');
//var cookieParser        = require('cookie-parser');
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




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



app.use(allowCrossDomain)

require('./conexion_contacts');

var Contact=require('./model_contact.js');


app.get("/",function(req,res) {

        var fs         = require('fs');
        var datos;

        Contact.count({},function (err,count) {

            if (err) {
                console.log("Hay un error");
                throw err;
            }
            if (count>0 ) {

                console.log("La base de datos no está vacía, tiene ", count, "elementos");
                // se borra con db.collection.drop();

            } else {

                console.log("Lectura de los datos e inserción en la base de datos ");

                fs.readFile('./datos_contactos.json', procesardatos);
            }

        });


        function procesardatos(error,data) {

            if (error) throw error;

            datos=JSON.parse(data);

            datos.forEach(function(elemento) {
                console.log(elemento);

                contact = new Contact(elemento);

                contact.save(function (err) {
                    if (!err) {
                        console.log("creado contacto");
                    } else {
                        console.log(err);
                    }
                });
            });
        }


    }
);






app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

