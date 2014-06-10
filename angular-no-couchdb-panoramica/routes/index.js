module.exports=function(app,vistas) {

app.use('/',         require('./raiz/index')(vistas))

// Aplicación wines mysql

app.use('/api/wines',   require('./wines/rutas_wine'));     //prefijo asociado a las rutas
app.use('/api/users',   require('./users/rutas_user'));     //prefijo asociado a las rutas



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}