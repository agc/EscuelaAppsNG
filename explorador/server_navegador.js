
var express  = require('express');
var app      = express();


app.configure(function() {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

var lsdirectorio=require('./lsdirectorio');

app.get('/mostrar', function(req, res) {

    lsdirectorio("","/home/agc/Central/Desarrollo/Escuela",res);

});


app.listen(3000);
console.log("App listening on port 8080");
