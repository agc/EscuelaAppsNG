var express             = require('express');
var router              = express.Router();
var tutorial            =require('./ctrl_tutorial')




router.get('/',                  tutorial.index);
router.post('/createdb',         tutorial.createdb)

router.post('/new_contact', tutorial.new_contact);

router.post('/update_contact', tutorial.update_contact);

router.post('/view_contact', tutorial.view_contact) // post porque se manda desde un formulario

router.post('/delete_contact', tutorial.delete_contact)






module.exports=router