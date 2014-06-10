var express             = require('express');
var router              = express.Router();
var tutorial            =require('./ctrl_tutorial')




router.get('/',                 tutorial.index);
router.post('/createdb',         tutorial.createdb)




module.exports=router