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


router.param('collectionName', function(req, res, next, collectionName){
    req.collection = db.collection(collectionName)
    console.log("Detectada " + collectionName)
    return next()
})


router.use(allowCrossDomain);


// middleware ejemplo, se usa en todos los requests
// también existe para app
app.use(function(req, res, next) {

    console.log('Se ha realizado una operación en una colección.');
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

app.use('/api', router);



module.exports = app;
