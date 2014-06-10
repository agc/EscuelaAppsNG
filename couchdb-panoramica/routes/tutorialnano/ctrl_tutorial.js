
var Modelo=require('./modelo_tutorial')


function index(req, res) {
    res.render('./tutorial/index.jade', { title: 'Posts con COUCHDB' });
}

function createdb(req, res){

    Modelo.creardb(req.body.dbname,

        function (err) {

        if (err) {
            res.send("Error al crear la base de datos " + req.body.dbname);
            return;
        }
        res.send("Base de datos " + req.body.dbname + " fué creado con éxito");
    })



}

exports.index=index
exports.createdb= createdb
