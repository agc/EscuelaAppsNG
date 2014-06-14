var express = require('express');
var router = express.Router();

var todo=require('./mysql_ctrl')

router.get('/info',function(req,res){
    res.send('<h1>Todo Service</h1>');
});


router.get('/todo',todo.all);


router.post('/todo',todo.insert);


router.put('/todo/:id',todo.put);


router.delete('/todo/:id',todo.delete);



module.exports = router;