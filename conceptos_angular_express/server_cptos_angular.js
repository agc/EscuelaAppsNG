
var express  = require('express');
var app      = express();


app.configure(function() {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});



app.get('/cptosangular', function(req, res) {
    res.sendfile('./public/cptos_angularjs1.html'); // load the single view file (angular will handle the page changes on the front-end)
});


app.listen(8080);
console.log("App listening on port 8080");
