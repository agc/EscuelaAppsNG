// server.js

// copiado de http://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/


var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoskin  = require('mongoskin')
var port       = process.env.PORT || 8080;

var db = mongoskin.db('mongodb://localhost:27017/nodetest2', {safe:true})

var ObjectID = require('mongoskin').ObjectID

var router = express.Router();


app.use(bodyParser());

app.use(express.static(__dirname + '/public'));


app.param('collectionName', function(req, res, next, collectionName){
    req.collection = db.collection(collectionName)
    console.log("Detectada nombre de coleccion")
    return next()
})




// middleware ejemplo, se usa en todos los requests
app.use(function(req, res, next) {

    console.log('Se ha realizado una operación.');
    next();
});



app.get('/restangular1', function(req, res) {
    res.sendfile('./public/restangular1.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/', function(req, res) {
    res.json({ message: 'seleccionar una coleccion, ej /api/bears!' });
})

app.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/')
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

router.route('/:id')
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

app.use('/api/:collectionName', router);



module.exports = app;
