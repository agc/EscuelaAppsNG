var MongoClient         = require('mongodb').MongoClient,
    Server              = require('mongodb').Server,
    CollectionDriver    = require('./collectiondriver').CollectionDriver,
    mongoHost           = 'localHost',
    mongoPort           = 27017,
    baseDeDatos         ="nodetest2";


var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));



// para evitar tener que escribir todo elcodigo en diversas
// funciones callback se usa la libreria q de promises
// npm install q o incluirlo en packages.json

// La clase collectionDriver implementa una serie de operaciones
// de manera bastante generica, para cualquier colección


module.exports=function (){
    var Q = require('q')
    var deferred = Q.defer();

    mongoClient.open(function(err, mongoClient) {
        if (!mongoClient) {

            deferred.reject("No se ha podido obtener un monglclient")
        }
        else {
            db = mongoClient.db(baseDeDatos);
            collectionDriver = new CollectionDriver(db);
            deferred.resolve(collectionDriver);
        }

    });

    return deferred.promise;

};

