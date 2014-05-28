var config = {};

config.couchdb = {};
config.twilio = {};

config.couchdb.url = 'https://agalveca.cloudant.com';
config.couchdb.port = 443;
config.couchdb.username = 'agalveca';
config.couchdb.password = '19601706';

config.twilio.sid = 'ACdab826ee1b7aecbc05a5d486626fb4cf';
config.twilio.key = 'ce44dcf3a66b7e8b331335c0a96eefec';
config.twilio.smsWebhook = 'https://nodeserver/vote/sms';
config.twilio.voiceWebhook = 'https://nodeserver/vote/voice';
config.disableTwilioSigCheck = false;

module.exports = config;