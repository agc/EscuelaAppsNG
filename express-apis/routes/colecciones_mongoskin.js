var mongo       = require('mongoskin');
var db          = mongo.db("mongodb://localhost:27017/nodetest2", {native_parser:true});

var ObjectID    = require('mongoskin').ObjectID

var express     = require('express');
var router      = express.Router();

/* biblioteca generica. El nombre de la coleccion se toma de la url */

module.exports=function(app) {

    app.use(function(req, res, next) {

        console.log('Se ha realizado una operación en una colección.');
        next();
    })

    router.get('/', function(req, res) {
        res.json({ message: 'seleccionar una coleccion, ej /colecciones/bears!' });
    })

    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }
    };

    // Cuando se detecta un parametro se convierte en un atributo de req
    // sera el nombre de la coleccion
    router.param('collectionName', function(req, res, next, collectionName){
        req.collection = db.collection(collectionName)
        console.log("Detectada " + collectionName)
        return next()
    })

    router.use(allowCrossDomain);


// middleware ejemplo, se usa en todos los requests
// también existe para app



    router.route('/:collectionName')
        .get(
        function(req, res) {
            req.collection.find({} ,{limit:10, sort: [['_id',-1]]}).toArray(
                function(err, results){
                    if (err)
                        res.send(err);
                    res.send(results)
                })
        })

        .post( function(req, res) {
            req.collection.insert(req.body, {}, function(e, results){

                if (e)  res.send(e);
                res.send(results)
            })
        });

    router.route('/:collectionName/:id')
        .get( function(req, res) {
            req.collection.findById(req.params.id, function(e, result){
                if (e)  res.send(e);
                res.send(result)
            })
        })
        .put(function(req, res) {
            req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result){
                if (e) res.send(e);
                res.send((result===1)?{msg:'success'}:{msg:'error'})
            })
        })
        .delete( function(req, res) {
            console.log(req.params.id)
            req.collection.remove({_id: new ObjectID.createFromHexString(req.params.id)}, function(e, result){
                if (e) res.send(e);
                res.send((result===1)?{msg:'success'}:{msg:'error'})
            })
        });

    /* Una alternativa

     var userToDelete = req.params.id;
     db.collection('userlist').removeById(userToDelete, function(err, result) {
     res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
     });

     */

    return router;
}