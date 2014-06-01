var http = require("http");
var url = require("url");
var importd = require("./lib/libejemplosnano");

function onRequest(request, response)
{
    var pathname = url.parse(request.url).pathname;
    console.log("Recibida petición para " + pathname +"   .");
    response.writeHead(200,{"Content-Type":"text/plain"});

    switch(pathname) {
        case '/creacion':
           importd.creacion();

            break;

        case '/listado':
            importd.lista();
            console.log("Registros listados")
            break
        default:
            console.log(pathname)

    }

    console.log("Finalizado ")
    response.write("Operaciones terminadas  couchdb");

    response.end();
}
http.createServer(onRequest).listen(9999);
console.log("El servidor ha arrancado..");
console.log("Requests disponibles creacion listado ......")