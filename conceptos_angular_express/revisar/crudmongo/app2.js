/*
 export NODE_PATH=/usr/local/lib/node_modules/
*/

var express = require('express');

var app = express();

app.configure(function(){
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.listen(8080);

console.log('Server is running on port 8080…');