var mongoose = require('mongoose'),
	// create models.
	userModel = require('../models/User'),
	showModel = require('../models/Show')

module.exports = function(envConfig){
	mongoose.connect(envConfig.database)

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Error connecting to the database!'))
}