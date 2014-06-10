
var modelo   = require('./modelo_events')
    ,  utils = require('./utils')

function listaEventos(req, res) {
    modelo.list(req.cookies['AuthSession'], function(err, list) {
        if (err) {
            res.send(401, JSON.stringify({error: true}));
        }
        else {
            res.send(list);
        }
    });
}

function event (req, res){

    modelo.findBy('all', {key: ['event:'+req.params.shortname], reduce:false}, function(err, event) {
        if (event) {
            modelo.voteCounts(event, function (err) {
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

    modelo.findByPhonenumber(to, function(err, event) {

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

            modelo.saveVote(event, vote, from);
            console.log('Accepting vote: ' + event.name + ', ' + from);
            response.send('<Response></Response>');
        }
    });


};

function eventById(req,res) {
    modelo.findBy('all', {key: [req.params.id], reduce:false}, function(err, event) {
        if (err) {
            res.send(404, 'We could not locate your event');
        }
        else {
            res.send(JSON.stringify(event));
        }
    });
}
function destroyEvent(req,res)  {
    modelo.destroy(req.cookies['AuthSession'], req.params.id, req.query.rev, function(err, body) {
        if (err) {
            console.log(err);
            res.send(500, JSON.stringify({error: true}));
        }
        else {
            res.send(200, "OK");
        }
    });
}

function saveEvent(req,res) {


    modelo.save(req.cookies['AuthSession'], req.body, function(err, body) {
        if (err) {
            console.log(err);
            res.send(500, JSON.stringify({error: true}));
        }
        else {
            // update the doc revision
            req.body._rev = body.rev;
            res.send(req.body);
        }
    });
}

exports.voteSMS         = voteSMS
exports.event           = event
exports.list            = listaEventos

exports.eventById       = eventById
exports.destroyEvent    = destroyEvent
exports.saveEvent       = saveEvent