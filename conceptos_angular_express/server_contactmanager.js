var express     = require("express");

var app         = express();

var port  	    = process.env.PORT || 3000;

require('./app/models/dbcontactmanager');


app.configure(function () {
    app.use(express.bodyParser());
});

require('./app/routes_contactmanager')(app);



app.listen(port, function() {
    console.log('Aplicación a la escucha en '+port);
});
