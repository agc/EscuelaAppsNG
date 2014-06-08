// query events based on either shortname or phonenumber (both unique keys)

var config                      = require('./config')

    , _und                      = require('underscore')

    , eventsCache               = {}
    , secondsToInvalidateEvents = config.couchdb.secondsToInvalidateEvents
    , votesCache                = {}
    , secondsToFlushVotes       = config.couchdb.secondsToFlushVotes


function getDb(cookie) {
    var params = {};
    if (cookie) {
        params.url = config.couchdb.url;
        params.cookie = 'AuthSession='+cookie;
    }
    else {
        params.url = config.couchdb.url;
    }
    return require('nano')(params);
}

// El voto se guarda en la estructura de datos votesCache
// el _id del voto se compone del event_id y del numero de telefono personal
// para evitar votos duplicados

function saveVote(event, vote, from) {

    var voteDoc = {
        _id: 'vote:' + event._id + ':' + from,
        type: 'vote',
        event_id: event._id,
        event_phonenumber: event.phonenumber,
        vote: vote,
        phonenumber: from
    };

    votesCache[voteDoc._id] = voteDoc;

    flushVotes();
}

// la estructura de datos se vacía, salvo que ocurra un error
// en ese caso se vuelve a llenar
function flushVotes() {

        var votesToSave = _und.values(votesCache);
        votesCache = {};

        if (votesToSave.length > 0) {

            getDb().bulk({docs: votesToSave}, function(err, body) {
                if (err) {
                    console.log("Failed to save votes, popping them back on the cache");
                    votesToSave.forEach(function(v) {
                        votesCache[v._id] = v;
                    });
                }
                else {
                    // loop through the response to detect votes that were rejected as duplicates
                    for (var i in votesToSave) {
                        if (body[i].error) {
                            // send the person an SMS to alert them that you can only vote once
                            console.log('Notifying of duplicate vote: ', votesToSave[i])

                        }
                    }
                }
            });
        }
    }

function invalidEvents() {
        eventsCache = {};
}


function findBy(view, params, callback) {
    var event;

    if (event = eventsCache[view + JSON.stringify(params)]) {
        callback(null, event);
    }
    else {
        getDb().view('view', view, params, function (err, body) { //event creo que le he llamado view
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                if (body.rows.length == 0) {
                    var msg = 'No match for: ' + view + ', ' + params;
                    console.log(msg);
                    callback(msg, null);
                }
                else {
                   event = body.rows[0].value;
                    eventsCache[view + JSON.stringify(params)] = event;
                    console.log(event)
                    callback(null, event);
                }
            }
        });
    }
}

function findByPhonenumber(phonenumber, callback) {

    findBy('byphonenumber', {key: phonenumber}, function(err, event) {
        if (err) {
            callback(err, null);
        }
        else {
            findBy('all', {key: [event._id], reduce: false}, callback);
        }
    });
}

function voteCounts(event, callback) {
    getDb().view('view', 'all', {startkey: [event._id], endkey: [event._id, {}, {}], group_level: 2}, function(err, body) {
        if (err) {
            callback(err);
        }
        else {
            // populate count for voteoptions
            event.voteoptions.forEach(function(vo, i){
                var found = _und.find(body.rows, function(x) {return x.key[1] == vo.id});
                vo['votes'] = (found? found.value : 0);
            });
            callback();
        }
    });
}

function list(cookie, callback) {
    getDb(cookie).view('view', 'list', function(err, body) {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            var events = _und.map(body.rows, function(row) {return row.value});
            callback(null, events);
        }
    });
}

function save (cookie, event, callback) {
    if (!event._id) { event._id = 'event:' + event.shortname }
    if (!event.type) { event.type = 'event' }

    getDb(cookie).insert(event, function(err, body) {
        callback(err, body);
    });
}

function destroy(cookie, id, rev, callback) {
    getDb(cookie).destroy(id, rev, function(err, body) {
        callback(err, body);
    });
}


exports.list=list //
exports.voteCounts=voteCounts //
exports.findByPhonenumber=findByPhonenumber
exports.findBy=findBy //
exports.invalidEvents=invalidEvents
//exports.flushVotes=flushVotes
exports.saveVote=saveVote

exports.save=save
exports.destroy=destroy

