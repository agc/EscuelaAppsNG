var config=require('./config_tutorial')
var nano = require('nano')(config.urlserver);

var db     = nano.use(config.dbname)

function creardb(nombre,callback) {
    nano.db.create(nombre, callback);
}

function insertar(documento,id,callback) {
    db.insert(documento,id,callback)
}

function obtener(id,callback) {
    db.get(id,{ revs_info: true },callback)
}

function eliminar(id,callback) {
    obtener(id,function(err,body) {
        if(!err) {

            db.destroy(id, body._rev,callback)


        } else {
            callback(err)

        }
    })
}


function actualizar(documento,id,callback) {

    obtener(id,function(err,body) {


        if(!err) {

            documento._rev=body._rev


            insertar(documento,id,callback)

        } else {
            callback(err)

        }
    })

}






exports.creardb= creardb
exports.insertar=insertar
exports.obtener=obtener
exports.eliminar=eliminar
exports.actualizar=actualizar
