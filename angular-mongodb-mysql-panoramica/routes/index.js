module.exports=function(app,vistas) {

app.use('/',         require('./raiz/index')(vistas))

// Aplicación wines mysql

app.use('/api/wines',   require('./wines/rutas_wine'));     //prefijo asociado a las rutas
app.use('/api/users',   require('./users/rutas_user'));     //prefijo asociado a las rutas

// Aplicacion todo mongoose

app.use('/api/todos',   require('./todo/rutas_todo'))

app.use('/api/contacts',   require('./contacts/rutas_contacts'))

app.use('/news', require('./news/rutas_news'))

app.use('/api/posts', require('./news/rutas_mongoose_posts'))

app.use('/api/users',require('./news/rutas_mongoose_users'))



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