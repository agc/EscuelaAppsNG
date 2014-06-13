var database    = require('./config_contact');
var mongoose    = require('mongoose');

var conexion=mongoose.createConnection(database.url);

mongoose.connection.on('connected', function () {
    console.log('Mongoose conectada a'+database.url);
});

mongoose.connection.on('error', function (error) {
    console.log('Mongoose error a'+error);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose desconectada');
});

module.exports=conexion

