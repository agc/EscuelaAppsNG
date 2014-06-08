// query events based on either shortname or phonenumber (both unique keys)

var config                      = require('./config')
    , utils                     = require('./utils')
    , _und                      = require('underscore')
    , db                        = require('nano')(config.couchdb.url)
    , eventsCache               = {}
    , secondsToInvalidateEvents = config.couchdb.secondsToInvalidateEvents
    , votesCache                = {}
    , secondsToFlushVotes       = config.couchdb.secondsToFlushVotes

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
    db.view('view', 'all', {startkey: [event._id], endkey: [event._id, {}, {}], group_level: 2}, function(err, body) {
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
    db.view('view', 'list', function(err, body) {
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

function listaEventos(req, res) {
    list(req.cookies['AuthSession'], function(err, list) {
        if (err) {
            res.send(401, JSON.stringify({error: true}));
        }
        else {
            res.send(list);
        }
    });
}

function event (req, res){

    findBy('all', {key: ['event:'+req.params.shortname], reduce:false}, function(err, event) {
        if (event) {
            voteCounts(event, function (err) {
                if (err) {
                    console.log(err)
                }
                else {

                    res.render('events/event', {
                        name: event.name,
                        shortname: event.shortname,
                        state: event.state,
                        phonenumber: utils.formatPhone(event.phonenumber),
                        voteoptions: JSON.stringify(event.voteoptions)
                    });
                }
            });
        }
        else {
            res.statusCode = 404;
            res.send('We could not locate your event');
        }
    });
};

function voteSMS(request, response) {

    var body    = request.param('Body').trim();
    var to      = request.param('To');
    var from    = request.param('From');

    findByPhonenumber(to, function(err, event) {

        if (err) {
            console.log(err);
            response.send('<Response></Response>');
        }
        else if (event.state == "off") {
            response.send('<Response><Sms>Voting is now closed.</Sms></Response>');
        }
        else if (!utils.testint(body)) {
            console.log('Bad vote: ' + event.name + ', ' + from + ', ' + body);
            response.send('<Response><Sms>Sorry, invalid vote. Please text a number between 1 and '+ event.voteoptions.length +'</Sms></Response>');
        }
        else if (utils.testint(body) && (parseInt(body) <= 0 || parseInt(body) > event.voteoptions.length)) {
            console.log('Bad vote: ' + event.name + ', ' + from + ', ' + body + ', ' + ('[1-'+event.voteoptions.length+']'));
            response.send('<Response><Sms>Sorry, invalid vote. Please text a number between 1 and '+ event.voteoptions.length +'</Sms></Response>');
        }
        else {
            var vote = parseInt(body);

            saveVote(event, vote, from);
            console.log('Accepting vote: ' + event.name + ', ' + from);
            response.send('<Response></Response>');
        }
    });


};

function eventById(req,res) {}

function destroyEvent(req,res) {}

function saveEvent(req,res) {}

exports.voteSMS = voteSMS
exports.event   = event
exports.list= listaEventos

exports.eventById=eventById
exports.destroyEvent=destroyEvent
exports.saveEvent=saveEvent

