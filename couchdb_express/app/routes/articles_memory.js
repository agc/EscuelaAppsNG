var ArticleProvider = require('../lib/articleprovider-memory').ArticleProvider;
var express = require('express');
var router = express.Router();

var articleProvider= new ArticleProvider();
/* GET home page. */

router.get('/', function(req, res){
    articleProvider.findAll(function(error, docs){
        res.send(docs);
    })});

module.exports = router;
