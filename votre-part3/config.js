var config = {};

config.couchdb = {};




//config.couchdb.url = 'https://username:passsword@couchserver:port/database';
config.couchdb.url = 'http://localhost:5984/events';
config.couchdb.secondsToInvalidateEvents = 120;
config.couchdb.secondsToFlushVotes = 10;



module.exports = config;