// codigo copiado de http://www.raywenderlich.com/61078/write-simple-node-jsmongodb-web-service-ios-app

// TODO comprobar que los ID son correctos

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

CollectionDriver.prototype.save = function(collectionName, obj, callback) {
    this.getCollection(collectionName, function(error, the_collection) {
        if( error ) callback(error)
        else {
            obj.created_at = new Date();
            the_collection.insert(obj, function() {
                callback(null, obj);
            });
        }
    });
};

//update a specific object
CollectionDriver.prototype.update = function(collectionName, obj, entityId, callback) {
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            obj._id = ObjectID(entityId); // convert to a real obj id
            obj.updated_at = new Date();
            the_collection.save(obj, function(error,doc) {
                if (error) callback(error);
                else callback(null, obj);
            });
        }
    });
};

//delete a specific object
CollectionDriver.prototype.delete = function(collectionName, entityId, callback) {
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            the_collection.remove({'_id':ObjectID(entityId)}, function(error,doc) {
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};

module.exports = CollectionDriver;