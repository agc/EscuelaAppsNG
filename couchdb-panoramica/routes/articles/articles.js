var express             = require('express');
var router              = express.Router();



module.exports=function(tipo) {
    var ArticleProvider,articleProvider

 if (tipo==="memoria") {

      ArticleProvider     = require('./lib_article_provider_mem').ArticleProvider;
      articleProvider     = new ArticleProvider();

 }
    if (tipo==='couchdb') {

         ArticleProvider = require('./lib_articles_provider_cradle').ArticleProvider;
         articleProvider= new ArticleProvider("http://localhost",5984);
    }

    router.get('/info', function(req, res) {
        res.render('./articles/info.jade', { title: 'Articles con COUCHDB' });
    })

    router.get('/', function(req, res){
        articleProvider.findAll(function(error, docs){
            res.render('./articles/blogs_index.jade', {title: 'Blog',articles: docs });
        })})

    router.get('/new', function(req,res){
        res.render('./articles/blog_new.jade', {title: 'New Post'});
    });

    router.post('/new', function(req,res) {
        console.log(tipo)
        var ira
        if (tipo === "memoria") {

            ira = "/articles"
        }

        else
        {
            ira = "/articulos"
        }
        articleProvider.save({title: req.param('title'),body: req.param('body')
        }, function(error, docs) {
            res.redirect(ira)
        });
    });
    return router;
}

