var express = require('express'),
    products = require('./route/product');

var app = express();

app.configure(function(){
    app.use(express.static(__dirname + '/View'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/products/:PName', products.findByName);

app.post('/products/:PName/:Type/:Description',products.addProduct);

app.put('/products/:PName/:Type/:Description', products.updateProduct);

app.delete('/products/:PName', products.deleteProduct);

app.listen(8080);

console.log('Server is running on port 8080…');