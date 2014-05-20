var express = require('express')

var session    = require('express-session');
var mongoStore = require('connect-mongo')(session);

var   flash = require('connect-flash')
    , helpers = require('view-helpers')
    , bodyParser= require('body-parser')
    , cookieParser= require('cookie-parser')
    , methodOverride=require('method-override')
    , favicon= require('static-favicon')
    , compress= require('compression')
    , morgan= require('morgan')




module.exports = function (app, config, passport) {

    app.set('showStackError', true)
    // should be placed before express.static
    app.use(compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }))
    app.use(favicon())
    app.use(express.static(config.root + '/public'))

    // don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'))
    }

    // set views path, template engine and default layout
    app.set('views', config.root + '/app/views')
    app.set('view engine', 'jade')

    // enable jsonp
    app.enable("jsonp callback")


    // dynamic helpers
    //  app.use(helpers(config.app.name))

    // cookieParser should be above session
    app.use(cookieParser())

    // bodyParser should be above methodOverride
    app.use(bodyParser())
    app.use(methodOverride())

    // express/mongo session storage
    /*    app.use(express.session({
     secret: 'ngFantasyFootball',
     store: new mongoStore({
     url: config.db,
     collection : 'sessions'
     })
     }))
     */
    // connect flash for flash messages
    app.use(flash())

    // use passport session
    /*   app.use(passport.initialize())
     app.use(passport.session())*/

    // routes should be at the last
    // app.use(app.router); no funciona las rutas se ejecutan en el orden en el que se han insertado




}