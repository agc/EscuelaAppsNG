var express = require('express');

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });

db = new Db('productsDB', server);

//Open Connection
db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'productsDB' database");

        db.collection('products', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'productsDB' collection doesn't exist. Creating it with sample data…");
            // populateDB();
            }
        });
    }

exports.findByName = function (req, res) {
        var PName = req.params.name;
        db.collection('products', function (err, collection) {
            collection.find({ "PName": PName }).toArray(function (err, names) {
            res.header("Content-Type:", "application/json");
            res.send(JSON.stringify(names));
        });
    });
};

// Un producto PName Type Description

exports.addProduct = function (req, res) {
    var product = req.body;

    db.collection('products', function (err, collection) {
        collection.insert(product, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
        } else {
            console.log('Success: ' + JSON.stringify(result[0]));
            res.send("Successfully Add product");
            console.log("Add Record");
        }
    });
});
}

exports.updateProduct = function (req, res) {
    var product = req.body;
    db.collection('products', function (err, collection) {
        collection.update({ PName: req.params.PName }, { PName: req.params.PName, Type: req.params.Type, Description: req.params.Description });
        console.log("Record is Update");
        res.send(req.body);
    });
}

exports.deleteProduct = function (req, res) {
    var PName = req.params.PName;
    console.log('Deleting product: ' + PName);
    db.collection('products', function (err, collection) {
        collection.remove({ PName: PName });
        res.send(req.body);
    });
}

});