var http = require("http");
var url = require("url");
var importd = require("./lib/lib_mantenimiento_nano");

function onRequest(request, response)
{
    var pathname = url.parse(request.url).pathname;
    console.log("Recibida petición para " + pathname +"   .");
    response.writeHead(200,{"Content-Type":"text/plain"});

    switch(pathname) {

        case '/listado_usuarios':
            importd.lista('usuario');
            console.log("Registros listados")
            break;

        case '/listado_equipos':
            importd.lista('equipo');
            console.log("Registros listados")
            break;

        case '/importacion_equipos':
            importd.importacion_equipos();
            console.log("Datos importados")
            break;

        case '/borrarusuarios':
            importd.borrarusuarios();
            console.log("Usuarios borrados")
            break
        default:
            console.log(pathname)

    }

    console.log("Finalizado ")
    response.write("Datos importados a la base de datos  couchdb");

    response.end();
}
http.createServer(onRequest).listen(9999);
console.log("Server has started.");