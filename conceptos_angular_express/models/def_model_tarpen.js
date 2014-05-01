var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Tarpen = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

mongoose.model( 'Tarpen', Tarpen );