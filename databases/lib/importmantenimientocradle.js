var cradle      = require("cradle"),
    sys         = require("sys"),
    fs          = require("fs"),
    database    ="mantenimiento";

var connection  = new (cradle.Connection)("localhost",5984);

var db          = connection.database(database);


function usuarios()
{

    var archivojson="./datos/usuario.json"

    var tipoinstancia="usuario"

    var datos = fs.readFileSync(archivojson,"utf-8");

    var objetos = JSON.parse(datos);

    for(u in objetos.RECORDS)
    {
        instancia = objetos.RECORDS[u];


        instancia.tipo=tipoinstancia
        instancia.ID= instancia.id
        delete instancia.id  // la propiedad _id se crea con id propio de couch



        db.save(instancia.id,instancia,function(er,ok)
        {
            if (er) {sys.puts("error: " + er); return; }
        });
    }
}

function killusers(){


    db.all(function(err, doc) {  // parece que hace una consulta a la vista _all_docs

        for(var i = 0; i < doc.length; i++) {



            /* No borrar documentos design . */
            if(doc[i].id.indexOf("_design") == -1) {


                db.get(doc[i].id, function (err, objeto)  {

                    if (objeto.hasOwnProperty("tipo") && objeto.tipo==="usuario") {


                        console.log(objeto)

                        db.remove(objeto.id, objeto.rev, function(err, doc) {console.log(doc);})

                    }


                })
                }}})}


exports.importarusuarios = usuarios;

exports.borrarusuarios= killusers;
