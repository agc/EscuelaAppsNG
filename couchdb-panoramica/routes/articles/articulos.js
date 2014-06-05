var ArticleProvider = require('../../lib/articles_provider_cradle').ArticleProvider;
var express = require('express');
var router = express.Router();

var articleProvider= new ArticleProvider("http://localhost",5984);


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

router.post('/new', function(req,res){
    articleProvider.save({title: req.param('title'),body: req.param('body')
    }, function(error, docs) {
        res.redirect('/articles')
    });
});


module.exports=router