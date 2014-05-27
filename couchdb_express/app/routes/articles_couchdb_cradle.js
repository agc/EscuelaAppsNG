var ArticleProvider = require('../lib/articles_couchdb_cradle').ArticleProvider;
var express = require('express');
var router = express.Router();

var articleProvider= new ArticleProvider("http://localhost",5984);
/* GET home page. */



module.exports = function(app) {

    router.get('/', function(req, res){

       /*  articleProvider.findAll(function(error, docs){
         res.send(docs);
         })});

*/
        articleProvider.findAll(function(error, docs){
            res.render('blogs_index.jade', {

                    title: 'Blog',
                    articles: docs

            });
        })})


    router.get('/new', function(req,res){
        res.render('blog_new', {

                title: 'New Post'

        });
    });

    router.post('/new', function(req,res){
        articleProvider.save({
            title: req.param('title'),
            body: req.param('body')
        }, function(error, docs) {
            res.redirect('/blog')
        });
    });



    return router;
}
