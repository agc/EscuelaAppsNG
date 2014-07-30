var express = require('express');
var app     = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
                .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));



var serveIndex = require('serve-index')


app.use('/agc',serveIndex('/home/agc', {'icons': true,'template':'public/directory.html','hidden':false,

    'filter':function(file,pos,list) {
    console.log(arguments);
    return (file.indexOf('.') === -1 || file.indexOf('pdf') >= 1 || file.indexOf("rar")>=1);
}}))

app.use('/agc', express.static('/home/agc'))


app.get('/', function(req, res){

    res.render('home');
});

app.get('/about', function(req, res){
    res.render('about');
});

// página 22

// custom 404 page
app.use(function(req, res){

    res.status(404);
    res.render('404');
});
// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});