var config=require('./config_tutorial')
var nano = require('nano')(config.urlserver);

var db     = nano.use(config.dbname)

function creardb(nombre,callback) {
    nano.db.create(nombre, callback);
}

exports.creardb= creardb