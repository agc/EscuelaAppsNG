var express     = require('express');
var router      = express.Router();
var todos       = require('./ctrl_todo')

router.get('/',            todos.list)
router.post('/',           todos.create)
router.delete('/:todo_id',todos.delete)

module.exports=router