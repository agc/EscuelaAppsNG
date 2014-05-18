var

    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var mongoHost = 'localHost';
var mongoPort = 27017;
var baseDeDatos="nodetest2";
var db;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));

mongoClient.open(function(err, mongoClient) {
    if (!mongoClient) {
        console.error("Error! Exiting... Must start MongoDB first");
        process.exit(1);
    }
     db = mongoClient.db(baseDeDatos);



});

exports.db=db;

