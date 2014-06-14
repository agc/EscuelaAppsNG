var express = require('express');
var router = express.Router();


router.get('/entrada',
    function(req, res) {
   res.sendfile('./public_news/index_news.html');

})


module.exports=router
