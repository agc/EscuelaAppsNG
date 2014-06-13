// load mongoose since we need it to define a model
var mongoose = require('./conexion_todo');

module.exports = mongoose.model('Todo', {
    text : String,
    done : Boolean
});
