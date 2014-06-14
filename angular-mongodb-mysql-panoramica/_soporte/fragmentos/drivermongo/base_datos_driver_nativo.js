// copiado de http://joedoyle.us/A-Pattern-for-Connecting-to-MongoDB-in-an-Express-App
// elimino replicaSet

var Q = require('q'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    Server = require('mongodb').Server,
    ReplSet = require('mongodb').ReplSet;
_ = require('underscore');



var Database = function(server, port, database) {

    this.server = server;
    this.port=port;
    this.database = database;
};

// La conexion se puede hacer var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
// aqui la hacemos mediante el metodo estatico connect

// connect devuelve una promesa Q.nfcall.then
// se puede encadnar otro then al que le pasará el db

Database.prototype.connect = function(collections,callback_error) {
    var self = this;
    var connectionString = "mongodb://" + this.server +":"+this.port+ "/" + this.database ;

    return Q.nfcall(MongoClient.connect, connectionString)
        .then(
        function(db) {

            _.each(collections, function(collection) {
                self[collection] = db.collection(collection);
            });

            return db;
        });
};




module.exports = Database;