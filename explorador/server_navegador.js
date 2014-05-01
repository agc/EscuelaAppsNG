
var express  = require('express');
var app      = express();


app.configure(function() {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

var lsdirectorio=require('./lsdirectorio');

app.get('/mostrar/:alias', function(req, res) {

    var directorio=req.query['dir'];

    console.log(req.params.alias);

    //res.charset = 'utf-8';

    lsdirectorio("/home/agc/Central/",directorio,res);

});


app.listen(3000);
console.log("App listening on port 3000");
