var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs')

// define schema
var userSchema = mongoose.Schema({
	email: { type: String, unique: true },
	password: String
})

// secure password storage before save to database
userSchema.pre('save', function(next){
	var user = this;
	if (!user.isModified('password')) return next();

	// generate salt
	bcrypt.genSalt(10, function(err, salt){
		if (err) return next(err);

		// generate hash
		bcrypt.hash(user.password, salt, function(err, hashed_pwd){
			if (err) return next(err);

			// store hash as password
			user.password = hashed_pwd;
			next()
		})
	})
})

// check password
userSchema.methods = {
	comparePassword: function(pwdToCheck, callback){
		bcrypt.compare(pwdToCheck, this.password, function(err, isMatch){
			if (err) return callback(err);

			callback(null, isMatch)
		})
	}
	// github.com/jaredhanson/passport-local
	// mongoosejs.com/docs/middleware.html
}

mongoose.model('User', userSchema)