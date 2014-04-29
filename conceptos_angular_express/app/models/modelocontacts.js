var mongoose = require('mongoose');



var Schema = mongoose.Schema;

// también new mongoose.Schema({...})

var ContactSchema= new Schema({
    name: { type: String, required: true },
    phone: { type: Number }
});

var ContactModel = mongoose.model('Contact', ContactSchema);

module.exports=ContactModel