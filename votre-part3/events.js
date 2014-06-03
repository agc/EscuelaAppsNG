// query events based on either shortname or phonenumber (both unique keys)

var config                       = require('./config')
    , utils                     = require('./utils')
    , _und                      = require('underscore')
    , db                        = require('nano')(config.couchdb.url)
    , eventsCache               = {}
    , secondsToInvalidateEvents = config.couchdb.secondsToInvalidateEvents
    , votesCache                = {}
    , secondsToFlushVotes       = config.couchdb.secondsToFlushVotes

    , flushVotes = function() {

        var votesToSave = _und.values(votesCache);
        votesCache = {};

        if (votesToSave.length > 0) {
            db.bulk({docs: votesToSave}, function(err, body) {
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
                        else {
                            io.sockets.in(votesToSave[i].event_id).emit('vote', votesToSave[i].vote);

                        }
                    }
                }
            });
        }
    }

    , invalidateEvents = function() {
        eventsCache = {};
    }

    , invalidateEventsJob = setInterval(invalidateEvents, 1000*secondsToInvalidateEvents)
    , flushVotesJob = setInterval(flushVotes, 1000*secondsToFlushVotes)
    , io;



function findBy(view, params, callback) {
    var event;

    if (event = eventsCache[view + JSON.stringify(params)]) {


        callback(null, event);
    }
    else {


        db.view('view', view, params, function (err, body) { //event creo que le he llamado view


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

    findBy('byphonenumber', {key: phonenumber}, function(err, event) { //vista byPhonenumber


        if (err) {
            callback(err, null);
        }
        else {


            findBy('all', {key: [event._id], reduce: false}, callback);
        }
    });
}

function voteCounts(event, callback) {


    db.view('view', 'all', {startkey: [event._id], endkey: [event._id, {}, {}], group_level: 2}, function(err, body) {
        if (err) {
            callback(err);
        }
        else {
            console.log("LLega aqui")
            // populate count for voteoptions
            event.voteoptions.forEach(function(vo, i){
                var found = _und.find(body.rows, function(x) {return x.key[1] == vo.id});
                vo['votes'] = (found? found.value : 0);
            });
            callback();
        }
    });
}

function saveVote(event, vote, from) {

    // The _id of our vote document will be a composite of our event_id and the
    // person's phone number. This will guarantee one vote per event
    var voteDoc = {
        _id: 'vote:' + event._id + ':' + from,
        type: 'vote',
        event_id: event._id,
        event_phonenumber: event.phonenumber,
        vote: vote,
        phonenumber: from
    };

    votesCache[voteDoc._id] = voteDoc;
}


module.exports = function(socketio) {
    io = socketio;
    return exports;
};

exports.findBy=findBy;
exports.findByPhonenumber=findByPhonenumber;
exports.voteCounts=voteCounts;
exports.saveVote=saveVote;
