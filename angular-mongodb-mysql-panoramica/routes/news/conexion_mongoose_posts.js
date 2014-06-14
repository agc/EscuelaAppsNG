var mongoose  = require('mongoose')

var conexion=mongoose.createConnection('mongodb://localhost:27017/nodetest2');

module.exports=conexion
