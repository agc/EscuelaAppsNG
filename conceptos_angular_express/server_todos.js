
var express     = require('express');
var app         = express();
var port  	    = process.env.PORT || 3000;
var mongoose    = require('mongoose');
var database    = require('./app/config/db_tododb');

mongoose.connect(database.url);

app.configure(function() {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.static(__dirname+'/app'));
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});



require('./app/routes_todos')(app);


app.get('/todos', function(req, res) {
    res.sendfile('./public/indextodos.html');
});




app.listen(port);
console.log("App listening on port " + port);
