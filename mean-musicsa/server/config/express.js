var express = require('express'),
	passport = require('passport'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	path = require('path'),
	favicon = require('static-favicon'),
	logger = require('morgan')

module.exports = function(app, envConfig){
	app.configure(function(){
		app.set('views', envConfig.rootPath + '/server/views');
		app.set('view engine', 'jade')
		app.use(logger('dev'))
		app.use(favicon())
		app.use(cookieParser())
		app.use(bodyParser())
		app.use(methodOverride())	// allows app.put() and app.delete()
		app.use(session({ secret: 'supersecrettvtrackr' }))
		app.use(passport.initialize())
		app.use(passport.session())		// tell passport to use sessions

		// static routing to public directory
		app.use(express.static(envConfig.rootPath + '/public'))

		// custom middleware
		app.use(function(req, res, next){
			if(req.user){
				// if user has been authenticated, give them a cookie
				res.cookie('user', JSON.stringify(req.user))
			}
			next()
		})
	})
}