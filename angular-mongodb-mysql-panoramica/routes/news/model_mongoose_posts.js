var conexion=require('./conexion_mongoose_posts')

var mongoose=require('mongoose');

var Schema = mongoose.Schema;

var esquema=new Schema({url:String,title:String});

var modelo=conexion.model('post',esquema);

module.exports=modelo



