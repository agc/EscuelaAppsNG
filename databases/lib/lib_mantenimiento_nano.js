var nano = require('nano')('http://localhost:5984')
    ,   fs          = require("fs")
    ,   database    = "mantenimiento";

function importarEquipos() {

    console.log("Importacion equipos")

    var mantenimiento = nano.use(database);


    var archivojson = "./datos/equipo.json"

    var tipodocumento = "equipo"

    var datos = fs.readFileSync(archivojson, "utf-8");

    var objetos = JSON.parse(datos);

    for (u in objetos.RECORDS) {
        documento = objetos.RECORDS[u];


        documento.tipo = tipodocumento
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

exports.importacion_equipos=importarEquipos
exports.lista=listarRegistros
