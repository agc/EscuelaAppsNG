var Show = require('mongoose').model('Show')

module.exports = {
	allShows: function(req, res, next){
		var query = Show.find({}) // gets entire Show collection
		if (req.query.genre){
			// restrict shows to matching genres
			query.where({ genre: req.query.genre })
		} else {
			query.limit(12)
		}

		query.exec(function(err, shows){
			if(err) return next(err)

			res.send(shows)
		})
	},
	getShow: function(req, res, next){
		Show.findById(req.params.showId, function(err, show){
			// if error, pass to error middleware
			if (err) return next(err)

			res.send(show)
		})
	},
	create: function(req, res, next){
		var show = new Show({
			// show details
		})

		show.save(function(err){
			
		})
	}
}