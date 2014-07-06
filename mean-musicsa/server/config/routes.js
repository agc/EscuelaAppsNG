var passport = require('passport'),
	awsCtrl = require('../controllers/aws'),
	showCtrl = require('../controllers/show'),
	authCtrl = require('../controllers/auth')

module.exports = function(app){

	// S3 routes to hit with XHR
	app.get('/addToS3', awsCtrl.addToS3)

	// API Routes
	app.get('/api/shows', showCtrl.allShows)
	app.get('/api/shows/:showId', showCtrl.getShow)
	app.post('/api/shows', ensureAuthenticated, showCtrl.create)

	// Authentication Routes
	// Error: Unknown authentication strategy "local"
	app.post('/api/login', passport.authenticate('local'), authCtrl.login)
	app.post('/api/signup', authCtrl.signup)
	app.get('/api/logout', authCtrl.logout)


	// undefined API routes
	app.all('/api/*', function(req, res){
		res.send(404, { message: 'Route not defined'})
	})

	// everything else handled by angular
	app.get('*', function(req, res){
		// pass the index page with currentUser data
		res.render('index', {
			currentUser: req.user
		})
	})

	// ERROR handling middleware
	app.use(function(err, req, res, next){
		console.error(err.stack)
		res.send(500, { message: err.message })
	})
}

// utility to protect routes from unauthenticated requests
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()) next();
	else res.send(401)
}