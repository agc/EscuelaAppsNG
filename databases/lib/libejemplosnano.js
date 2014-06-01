var nano = require('nano')('http://localhost:5984');

function crearAlicia() {
    console.log("Se ejecuta")

    nano.db.destroy('alicia', function () {

        nano.db.create('alicia', function () {

            var alice = nano.use('alicia');

            alice.insert({ loco: true, color:"blanco" }, 'conejo', function (err, body, header) {
                if (err) {
                    console.log('[alice.insert] ', err.message);
                    return;
                }
                console.log('se ha insertado el conejo.')
                console.log(body);
            });
        });
    });
}

function listarRegistros() {

    var alice = nano.use('alicia');

    alice.list({include_docs:true},function(err, body) {
        if (!err) {
            body.rows.forEach(function(doc) {
                console.log(doc);
            });
        }
    });
}

exports.creacion=crearAlicia
exports.lista=listarRegistros
