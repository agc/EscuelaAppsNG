var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Context-Type': 'text/plain' });
    response.end('Hello World \n');
}).listen(8080);
console.log('Server is running on port no 8080');