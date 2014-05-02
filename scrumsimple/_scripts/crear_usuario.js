var  mongodb = require('mongodb')
    ,mongoose = require('mongoose');


var config      = require('../config/config');
var Usuario      = require('../models/usuario');

mongoose.connect(config.mongo.local);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
    console.log('Connected to DB');
});

var usuario     = { email: 'admin@abc.com', password: 'changeme', admin: true, firstName: 'Admin', lastName: 'User' };

var user         = new Usuario(usuario);

user.save(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('user: ' + user.email + " saved.");
    }
});


