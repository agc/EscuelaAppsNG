var mongo       = require('mongoskin');
var db          = mongo.db("mongodb://localhost:27017/nodetest2", {native_parser:true});

var express     = require('express');
var router      = express.Router();

module.exports=function(app) {


    router.get('/user', function(req, res) {
        var db = req.db;
        db.collection('userlist').find().toArray(function (err, items) {
            res.json(items);
        });
    });

    // en PostMan usar un formulario sin content-type json
    router.post('/user', function(req, res) {
        var db = req.db;

        console.log(req.body)
        db.collection('userlist').insert(req.body, function(err, result){
            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );
        });
    });



    router.delete('/user/:id', function(req, res) {
        var db = req.db;
        var userToDelete = req.params.id;
        db.collection('userlist').removeById(userToDelete, function(err, result) {
            res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
        });
    });

    app.use(function(req,res,next){
        req.db = db;
        next();
    });

    return router;
}