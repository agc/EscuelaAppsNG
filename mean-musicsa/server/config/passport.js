var passport = require('passport'),
	User = require('mongoose').model('User'),
	LocalStrategy = require('passport-local').Strategy

// check out: http://passportjs.org/guide/configure/
// difference is overrides 'username' to be called 'email'
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done){
	User.findOne({ email: email }, function(err, user){
		if (err) return done(err);

		// user not found
		if(!user) return done(null, false);

		// mongoose User schema method
		user.comparePassword(password, function(err, isMatch){
			if(err) return done(err);

			if(isMatch) return done(null, user);

			// incorrect password
			return done(null, false)
		})


	})
}))

passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user)
	})
})