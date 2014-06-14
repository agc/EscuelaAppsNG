var mongoskin  = require('mongoskin')

var db = mongoskin.db('mongodb://localhost:27017/nodetest2', {safe:true})

var ObjectID = require('mongoskin').ObjectID

module.exports= function(prefijo,router,app) {


    router.param('collectionName', function(req, res, next, collectionName){
        req.collection = db.collection(collectionName)
        console.log("Detectada " + collectionName)
        return next()
    });

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

    app.use(prefijo, router);


}