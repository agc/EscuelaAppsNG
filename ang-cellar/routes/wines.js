var express = require('express');
var router = express.Router();

var Wines=require('../controllers/wine')

/* GET users listing. */
router.get('/', Wines.list);

module.exports = router;
