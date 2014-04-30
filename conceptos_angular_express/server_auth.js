
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');

var configDB = require('./app_auth/config/db_authdb.js');


mongoose.connect(configDB.url);

require('./app_auth/config/passport')(passport);

app.configure(function() {


    app.use(express.logger('dev'));
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser());  // get information from html forms

    app.set('view engine', 'ejs');
    app.set('views',__dirname+'/app_auth/views');

    // required for passport
    app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

});


require('./app_auth/routes.js')(app, passport);


app.listen(port);
console.log('The magic happens on port ' + port);
