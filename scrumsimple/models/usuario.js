var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    admin: { type: Boolean, required: true },
    firstName:{ type: String, required: true},
    lastName: {type:  String}

});


// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    //return bcrypt.compareSync(password, this.password);

    return password==this.password;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);