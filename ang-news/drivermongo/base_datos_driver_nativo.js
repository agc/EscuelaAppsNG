// copiado de http://joedoyle.us/A-Pattern-for-Connecting-to-MongoDB-in-an-Express-App
// elimino replicaSet

var Q = require('Q'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    Server = require('mongodb').Server,
    ReplSet = require('mongodb').ReplSet;
_ = require('underscore');

var mongoHost           = 'localHost',
    mongoPort           = 27017,
    baseDeDatos         ="nodetest2";

var Database = function(server, database) {
    this.server = server;
    this.database = database;
};

// La conexion se puede hacer var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
// aqui la hacemos mediante el metodo estatico connect

// connect devuelve una promesa Q.nfcall.then
// se puede encadnar otro then al que le pasará el db

Database.prototype.connect = function(collections,callback_error) {
    var self = this;
    var connectionString = "mongodb://" + this.server + "/" + this.database ;
    return Q.nfcall(MongoClient.connect, connectionString)
        .then(function(db) {
            _.each(collections, function(collection) {
                self[collection] = db.collection(collection);
            });

            return db;
        },callback_error("BD: error de conexion"));
};




module.exports = Database;