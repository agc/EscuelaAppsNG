var express     = require("express");

var app         = express();

var port  	    = process.env.PORT || 3000;

require('./app/conexion/conexion_contacts');


app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/app'));
});

require('./app/routes_contacts')(app);



app.listen(port, function() {
    console.log('Aplicación a la escucha en '+port);
});
