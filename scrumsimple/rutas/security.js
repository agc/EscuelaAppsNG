exports.addRoutes = function(app, security) {

    /* Middleware para ver que llega la petición
    app.post("/login", function(req,res,next) {
        console.log("Llega a login");
        console.log(JSON.stringify(req.body));
        return next();
    })
    */

    app.post('/login', security.login);
    app.post('/logout', security.logout);

// Retrieve the current user
    app.get('/current-user', security.sendCurrentUser);

// Retrieve the current user only if they are authenticated
    app.get('/authenticated-user', function(req, res) {
        security.authenticationRequired(req, res, function() { security.sendCurrentUser(req, res); });
    });

// Retrieve the current user only if they are admin
    app.get('/admin-user', function(req, res) {
        security.adminRequired(req, res, function() { security.sendCurrentUser(req, res); });
    });

};