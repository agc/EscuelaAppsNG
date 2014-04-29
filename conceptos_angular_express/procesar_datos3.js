
var express     = require("express");

var app         = express();

var port  	    = process.env.PORT || 3000;

require('./app/models/dbcontactmanager');

var ContactModel=require('./app/models/modelocontacts.js');

var contact;



app.configure(function () {
    app.use(express.bodyParser());
});



app.get("/",function(req,res) {

        var fs         = require('fs');
        var datos;

        console.log("Llega");

        ContactModel.count({},function (err,count) {

            console.log("Llega");

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

                contact = new ContactModel(elemento);

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


app.listen(port, function() {
    console.log('Aplicación a la escucha en '+port);
});
