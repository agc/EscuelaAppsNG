var express     = require("express");
var app         = express();
var database    = require('./app/config/databasecontact');
var port  	    = process.env.PORT || 3000;

var mongoose = require('mongoose');

mongoose.connect(database.url);


app.configure(function () {
    app.use(express.bodyParser());
});

require('./app/routes_contactmanager')(app);



app.listen(port, function() {
    console.log('Aplicación a la escucha en '+port);
});
