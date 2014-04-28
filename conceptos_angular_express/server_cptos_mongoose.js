
var express     = require('express');
var app         = express();
var port  	    = process.env.PORT || 8080;
var mongoose    = require('mongoose');
var database    = require('./config/database1');

mongoose.connect(database.url);

app.configure(function() {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});



require('./app/routes')(app);


app.get('/cptosmongoose', function(req, res) {
    res.sendfile('./public/cptos_mongoose.html');
});




app.listen(port);
console.log("App listening on port 8080");
