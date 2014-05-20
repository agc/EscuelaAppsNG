

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
module.exports = function (app, passport, auth) {
    app.use(function (err, req, res, next) {
        // treat as 404
        if (~err.message.indexOf('not found')) return next()

        // log it
        console.error(err.stack)

        // error page
        res.status(500).render('500', { error: err.stack })
    })

// assume 404 since no middleware responded
    app.use(function (req, res, next) {
        res.status(404).render('404', { url: req.originalUrl, error: 'Página no encontrada' })
    })

}