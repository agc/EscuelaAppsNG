var mongoose = require('mongoose')

var showSchema = mongoose.Schema({
	name: { type: String, unique: true },
	genre: [String],
	rating: Number,
	ratingCount: Number,
	firstAired: Date,
	subscribers: [{
		// array of User Object IDs
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	episodes: [{
		season: Number,
		episodeNumber: Number,
		episodeName: String,
		overview: String
	}]
})


mongoose.model('Show', showSchema)

mongoose.model('Show')