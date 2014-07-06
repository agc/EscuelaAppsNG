var User = require('mongoose').model('User')

module.exports = {
	login: function(req, res){
		res.cookie('user', JSON.stringify(req.user))
		res.send(req.user)
	},
	// can add input validation with express-validator: github.com/ctavan/express-validator
	signup: function(req, res, next){
		var user = new User({
			email: req.body.email,
			password: req.body.password
		})

		user.save(function(err){
			if (err) return next(err);

			res.send(200)	// user saved to database
		})
	},
	logout: function(req, res, next){
		// passport exposes logout method on req object.
		// it removes the req.user property and ..clears login session
		req.logout()
		res.send(200)
	}
}