var express = require('express');
var router = express.Router();

var Wines=require('../controllers/wine')

/* GET users listing. */
router.get('/', Wines.list);
router.get('/:id', Wines.get);
router.post('/',Wines.new);
router.put('/:id',Wines.update);
router.delete('/:id',Wines.delete);

module.exports = router;
