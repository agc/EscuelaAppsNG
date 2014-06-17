var connect = require('connect');

var http=require('http')


var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('capitulo2'))
    .use(connect.static('./'))
    .use(function(req, res){
        res.end('hello world\n');
    })

http.createServer(app).listen(5000);

console.log("Iniciado el servidor en el puerto 5000")
