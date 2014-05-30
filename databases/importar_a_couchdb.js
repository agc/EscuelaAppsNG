var http = require("http");
var url = require("url");
var importd = require("./importflickr");

function onRequest(request, response)
{
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    if(pathname=="/import")
    {
        importd.importdata();
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("Imported the data from flickr into couchdb");
        response.end();
    }
}
http.createServer(onRequest).listen(9999);
console.log("Server has started.");