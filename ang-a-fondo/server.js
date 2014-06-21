
// ver https://github.com/senchalabs/connect
var connect = require('connect');
var static= require('serve-static')
var logger=require('morgan')

var http=require('http')


var app = connect()

    app.use(logger('dev'))
     app.use(static('capitulo7'))
    app.use(static('./'))
    app.use(function(req, res){
        res.end('hello world\n');
    })

http.createServer(app).listen(5000);

console.log("Iniciado el servidor en el puerto 5000")
