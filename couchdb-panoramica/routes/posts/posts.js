var express             = require('express');
var router              = express.Router();

var couchdb             = require('couchdb')
    , settings          = require('../../config/posts_config');

var client              = couchdb.createClient(settings.port, settings.host, { user: settings.user, password: settings.password });
var db                  = client.db(settings.db);


router.get('/', function(req, res) {
res.render('./posts/index', { title: 'Posts con COUCHDB' });
});


router.get('/new', function(req, res) {
    res.render('./posts/new', { title: 'Posts con COUCHDB' });
});


router.post('/',function(req,res) {

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


})


module.exports = router;
