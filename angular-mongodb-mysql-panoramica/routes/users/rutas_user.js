var express = require('express');
var router = express.Router();

var User=require('./ctrl_user')

/* GET users listing. */
router.get('/', User.list);
router.get('/:id', User.get);
router.post('/',User.new);
router.put('/:id',User.update);
router.delete('/:id',User.delete);

module.exports = router;
