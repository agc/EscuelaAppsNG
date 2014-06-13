var mongoose    = require('mongoose');
var database    = require('./config_todo');

mongoose.connect(database.url);

module.exports=mongoose

