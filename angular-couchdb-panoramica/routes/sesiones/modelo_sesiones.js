var config  = require('./../events/config')
    , db    = require('nano')({url: config.couchdb.url})

    , loggedInUsers = {}


 function addLoggedInUser(authSession, user) {
        loggedInUsers[authSession] = user;
  }

function getLoggedInUser(authSession) {
        return loggedInUsers[authSession]
}

function removeLoggedInUser (authSession) {
        delete loggedInUsers[authSession]
    }

function login (username, password, callback) {
        db.auth(username, password, function (err, body, headers) {
            if (err) {
                return callback(err);
            }
            var cookie = headers['set-cookie'][0];
            var authSession = cookie.split(';')[0].split('=')[1];
            addLoggedInUser(authSession, username);
            callback(null, cookie);
        });
 };

exports.addLoggedInUser=addLoggedInUser
exports.getLoggedInUser=getLoggedInUser
exports.removeLoggedInUser=removeLoggedInUser
exports.login=login