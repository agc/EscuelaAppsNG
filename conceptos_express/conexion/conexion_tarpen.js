var database    = require('../config/db_tarpen');
var mongoose = require('mongoose');
mongoose.connect(database.url);

