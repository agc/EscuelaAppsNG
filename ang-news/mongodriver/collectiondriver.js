// codigo copiado de http://www.raywenderlich.com/61078/write-simple-node-jsmongodb-web-service-ios-app


var ObjectID = require('mongodb').ObjectID;

///////////////////////////////////////////////////////////////////////
// Obtener datos

//////////////////////////////////////////////////////////////////////


//db devuelto por el procedimiento de conexión a mongo
CollectionDriver = function(db) {
    this.db = db;
};

// obtiene una colección y se la pasa a la función callback

CollectionDriver.prototype.getCollection = function(collectionName, callback) {
    this.db.collection(collectionName, function(error, the_collection) {
        if( error ) callback(error);
        else callback(null, the_collection);
    });
};

//funcion que con la coleccion, cuyo nombre se pasa como parametro
// obtiene todos los registros y se pasan al callback

CollectionDriver.prototype.findAll = function(collectionName, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
        if( error ) callback(error);
        else {
            the_collection.find().toArray(function(error, results) { //B
                if( error ) callback(error);
                else callback(null, results);
            });
        }
    });
};

// Obtiene un documento, cuyo id se pasa como parametro
// se chequea que el id sea correcto

CollectionDriver.prototype.get = function(collectionName, id, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"); //B
            if (!checkForHexRegExp.test(id)) callback({error: "invalid id"});
            else the_collection.findOne({'_id':ObjectID(id)}, function(error,doc) { //C
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};

exports.CollectionDriver = CollectionDriver;