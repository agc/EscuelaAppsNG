var express             = require('express');
var router              = express.Router();



router.get('/', function(req, res) {
    res.render('./moreposts/index.jade', { title: 'Posts con COUCHDB' });
});



module.exports = router;
