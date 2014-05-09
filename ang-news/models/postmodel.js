var mongoose=require('mongoose');
var Schema = mongoose.Schema;

module.exports=function(modelo){

    var esquema=new Schema({url:String,title:String});

    return mongoose.model(modelo,esquema);

}