var express             = require('express');
var router              = express.Router();
var posts               = require('./lib_posts_couchdb')



router.get('/', function(req, res) {
res.render('./posts/index', { title: 'Posts con COUCHDB' });
});


router.get('/new', function(req, res) {
    res.render('./posts/new', { title: 'Posts con COUCHDB' });
});

// debe existir una vista _design/blog/posts_by_date

router.get('/list', posts.lista);


router.get('/:id',posts.documento)



router.post('/', posts.nuevo)


router.post('/:id/comments', posts.nuevo_comentario);


module.exports = router;
