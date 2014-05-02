var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/usuario');  // um modelo de usuario


module.exports = new LocalStrategy({
        // la estrategia local, por defecto usa username y password
        usernameField: 'email'
       // ,passwordField: 'password',
       // passReqToCallback: true
    },
    function ( email, password, done) { // callback with email and password from our form



        User.findOne({ email: email }, function (err, user) {



            if (err)  return done(err);


            if (!user)
                return done(null, false, { message: 'Usuario desconocido '  });


            if (!user.validPassword(password))
                return done(null, false, { message: ' Contraseña incorrecta '  });


            return done(null, user);
        });

    });






