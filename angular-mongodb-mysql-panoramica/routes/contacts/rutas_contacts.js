var express         = require('express');
var router          = express.Router();
var contacts         = require('./ctrl_contact')



router.get("/",         contacts.index);

router.get('/:id',      contacts.findById);
router.post('/',        contacts.addContact);
router.put('/:id',      contacts.updateContact);
router.delete('/:id',   contacts.deleteContact);

module.exports=router




