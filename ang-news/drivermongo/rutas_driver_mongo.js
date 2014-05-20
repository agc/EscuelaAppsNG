var mongoHost           = 'localhost',
    mongoPort           = 27017,
    baseDeDatos         ="nodetest2";

var Database=require('./base_datos_driver_nativo');
var CollectionDriver=require('./collectiondriver');

var definirRutas= function(app) { // se le debe pasar app para  que pueda definir rutas

    return function (db) {

        var cdrv = new CollectionDriver(db);



        app.get('/api/:collection', function (req, res) {
            var params = req.params;
            cdrv.findAll(req.params.collection, function (error, objs) {
                if (error) {
                    res.json(502, {error: error, url: req.url});
                }
                else {
                    res.jsonp(objs);

                }
            });
        });

        app.get('/api/:collection/:entity', function (req, res) { //I
            var params = req.params;
            var entity = params.entity;
            var collection = params.collection;
            if (entity) {
                cdrv.get(collection, entity, function (error, objs) { //J
                    if (error) {
                        res.json(502, {error: error, url: req.url})
                    }
                    else {
                        res.jsonp(objs);
                    } //K
                });
            } else {
                res.json(502, {error: 'bad url', url: req.url});
            }
        });

        // al mandar con la aplicacion de google Postman
        // se envia con www-form-urlencode y sin cabeceras

        app.post('/api/:collection', function (req, res) {
            var object = req.body;

            var collection = req.params.collection;
            cdrv.save(collection, object, function (err, docs) {
                if (err) {
                    res.json(502, {error: error, url: req.url });
                }
                else {
                    res.jsonp(201, docs);
                }
            });
        });

        app.put('/api/:collection/:entity', function (req, res) {
            var params = req.params;
            var entity = params.entity;
            var collection = params.collection;
            if (entity) {
                cdrv.update(collection, req.body, entity, function (error, objs) {
                    if (error) {
                        res.json(502, {error: error, url: req.url });
                    }
                    else {
                        res.jsonp(200, objs);
                    } //C
                });
            } else {
                var error = { "message": "Cannot PUT a whole collection" };
                res.json(400, error);
            }
        });

        app.delete('/api/:collection/:entity', function (req, res) {
            var params = req.params;
            var entity = params.entity;
            var collection = params.collection;
            if (entity) {
                cdrv.delete(collection, entity, function (error, objs) {
                    if (error) {
                        res.json(400, error);
                    }
                    else {
                        res.jsonp(200, objs);
                    } //C 200 b/c includes the original doc
                });
            } else {
                var error = { "message": "Cannot DELETE a whole collection" };
                res.json(400, error);
            }
        });

    }
}


module.exports=function(app) {

    var dataBase = new Database(mongoHost, mongoPort,baseDeDatos);

    dataBase.connect([], function (error) {
        console.log(error)
    }).
        then(definirRutas(app));
}




