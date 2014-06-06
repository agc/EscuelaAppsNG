var
    couchdb             = require('couchdb')
    , settings          = require('../config/posts_config')
    , client            = couchdb.createClient(settings.port, settings.host,
                            { user: settings.user, password: settings.password })
    , db                = client.db(settings.db);



// estas funciones mezclan el acceso a datos con el envío a la vista

module.exports={

    lista:function(req,res) {

    db.view('blog', 'posts_by_date').then(

        function(resp) {

            var posts = resp.rows.map(function (x) {
                return x.value;
            });

            res.render('./posts/list', {posts: posts})
        },
        function(error) {

            res.render('error',{message:error.message,error:error})
        }

    )},

    documento:function(req,res) {

        db.openDoc(req.params.id).then(function(post) {
            console.log("llega")
            console.log(post)
            res.render('./posts/show',{post:post,id:req.params.id})
        })
    },

    nuevo:function(req,res) {

        var post ={
            title:req.body.title,
            body:req.body.body
        }

        post.type = 'post';

        return db.saveDoc(post).then(function(resp) {
                return res.redirect('/posts');
            },
            function (error) {

                console.log(error)
            });


    },

    nuevo_comentario:function(req,res) {
        var comment = req.params;

        var comentario ={
            author:req.body.author,
            body:req.body.body
        }


        return db.openDoc(req.params.id).then(function(post) {
            post.comments = post.comments || [];
            post.comments.push(comentario);

            return db.saveDoc(post).then(function(resp) {
                res.redirect('/posts/'+req.params.id);
            });
        });
    }


}
