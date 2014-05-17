var mongoose  = require('mongoose')

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/nodetest2');

var Modelo= require('./models/postmodel')('post');

module.exports= function(prefijoruta,router,app) {

   router.route('/posts')
        .get(
        function(req, res) {

            Modelo.find(function (err, resultados) {
                if (!err) {
                    res.jsonp(resultados);
                } else {
                    console.log(err);
                }
            }
            );

        })

        .post( function(req, res) {

           var modelo = new Modelo(req.body);

           modelo.save(function (err) {
               if (!err) {
                   res.jsonp(modelo);
               } else {
                   console.log(err);
               }


           }) });


    router.route('/posts/:id')
        .get( function(req, res) {
            return Modelo.findById(req.params.id, function (err, post) {


                    if (!err) {
                        res.jsonp(post);
                    } else {
                        console.log(err);
                    }

                });


        })
           .delete( function (req, res){

                return Modelo.findById(req.params.id, function (err, post) {
                    
                    return  post.remove(function (err) {
                        if (!err) {
                            console.log("removed");
                            return res.send('');
                        } else {
                            console.log(err);
                        }

                    })})
            })




        .put(function(req, res) {
        return Modelo.findById(req.params.id, function (err, post) {
            post.url = req.body.url;
            post.title = req.body.title;
            post.save(function (err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                res.jsonp(post);
            });
        });
        });



    app.use(prefijoruta, router);


}