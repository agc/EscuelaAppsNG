
var sessions = require('./models/sessions')


function admin (req, res) {
    var username = sessions.getLoggedInUser(req.cookies['AuthSession']);

    res.render('admin', {username: username});
}

function login(req, res) {

    // en caso de error se invoca esta función con el parámetro err
    // en caso de exito se le pasa el parametro cookie
    sessions.login(req.body.username, req.body.password, function(err, cookie) {
        if (err) {
            res.json(401, {error: true});
        }
        else {
            res.cookie(cookie);
            res.send(req.body);
        }
    });
}

function logout(req, res) {
    sessions.removeLoggedInUser(req.cookies['AuthSession']);
    res.clearCookie('AuthSession');
    res.send(200, "OK");
}


exports.login=login
exports.logout=logout
exports.admin=admin