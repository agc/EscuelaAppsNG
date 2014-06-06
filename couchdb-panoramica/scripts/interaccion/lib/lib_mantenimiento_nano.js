var nano = require('nano')('http://localhost:5984')
    ,   fs          = require("fs")
    ,   database    = "mantenimiento"

function importarEquipos() {

    console.log("Importacion equipos")

    var   archivojson = "./scripts/interaccion/datos/equipo.json";


    var mantenimiento = nano.use(database);

    var datos = fs.readFileSync(archivojson, "utf-8");

    var objetos = JSON.parse(datos);

    for (u in objetos.RECORDS) {
        documento = objetos.RECORDS[u];
        documento.tipo = 'equipo'
        documento.ID = documento.id
        delete documento.id  // la propiedad _id se crea con id propio de couch

        mantenimiento.insert(documento,
        function (err, body, header) {
            if (err) {
                console.log('[equipo  insertar] ', err.message);
                return;
            }
            console.log('se ha insertado el equipo.')
            console.log(body);
        }

    )
        ;

    }
}

function importarUsuarios() {

    console.log("Importacion usuarios")

    var   archivojson = "./scripts/interaccion/datos/usuario.json"; // a diferencia de un require ruta desde proceso


    var mantenimiento = nano.use(database);

    var datos = fs.readFileSync(archivojson, "utf-8");

    var objetos = JSON.parse(datos);

    for (u in objetos.RECORDS) {
        documento = objetos.RECORDS[u];
        documento.tipo = 'usuario'
        documento.ID = documento.id
        delete documento.id  // la propiedad _id se crea con id propio de couch

        mantenimiento.insert(documento,
            function (err, body, header) {
                if (err) {
                    console.log('[usuario  insertar] ', err.message);
                    return;
                }
                console.log('se ha insertado el usuario.')
                console.log(body);
            }

        )
        ;

    }
}


function listarRegistros(tipo) {

    var mantenimiento = nano.use(database);

    mantenimiento.list({include_docs:true},function(err, body) {
        if (!err) {
            body.rows.forEach(function(doc) {
                if (doc.doc.tipo==tipo)
                console.log(doc);
            });
        }
    });
}

exports.importacion_equipos = importarEquipos
exports.importacion_usuarios= importarUsuarios
exports.lista               = listarRegistros
