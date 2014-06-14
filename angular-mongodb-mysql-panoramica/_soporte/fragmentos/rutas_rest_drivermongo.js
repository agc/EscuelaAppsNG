var promesaCollectionDriver= require("./mongodriver/db")();

module.exports=function(app) {

    promesaCollectionDriver.then(

        function (cdrv) {



            app.get('/:collection', function(req, res) {
                var params = req.params;
                cdrv.findAll(req.params.collection, function(error, objs) {
                    if (error) { res.json(502, {error: error, url: req.url}); }
                    else {
                        res.jsonp(objs);

                    }
                });
            });

            app.get('/:collection/:entity', function(req, res) { //I
                var params = req.params;
                var entity = params.entity;
                var collection = params.collection;
                if (entity) {
                    cdrv.get(collection, entity, function(error, objs) { //J
                        if (error) {res.json( 502, {error: error, url: req.url})}
                        else { res.jsonp( objs); } //K
                    });
                } else {
                    res.json(502, {error: 'bad url', url: req.url});
                }
            });

            // al mandar con la aplicacion de google Postman
            // se envia con www-form-urlencode y sin cabeceras

            app.post('/:collection', function(req, res) {
                var object = req.body;

                var collection = req.params.collection;
                collectionDriver.save(collection, object, function(err,docs) {
                    if (err) { res.json(502,{error:error,url:req.url }); }
                    else { res.jsonp(201, docs); }
                });
            });

            app.put('/:collection/:entity', function(req, res) {
                var params = req.params;
                var entity = params.entity;
                var collection = params.collection;
                if (entity) {
                    collectionDriver.update(collection, req.body, entity, function(error, objs) {
                        if (error) { res.json(502,{error:error,url:req.url }); }
                        else { res.jsonp(200, objs); } //C
                    });
                } else {
                    var error = { "message" : "Cannot PUT a whole collection" };
                    res.json(400, error);
                }
            });

            app.delete('/:collection/:entity', function(req, res) {
                var params = req.params;
                var entity = params.entity;
                var collection = params.collection;
                if (entity) {
                    collectionDriver.delete(collection, entity, function(error, objs) {
                        if (error) { res.json(400, error); }
                        else { res.jsonp(200, objs); } //C 200 b/c includes the original doc
                    });
                } else {
                    var error = { "message" : "Cannot DELETE a whole collection" };
                    res.json(400, error);
                }
            });

        },

        function (error) {
            console.log("Llega")
            console.log(error)
        }

    );


};