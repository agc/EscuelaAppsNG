var express = require('express');
var app     = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
                .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = require('./weather').getWeatherData(); // Otra forma de acceder a variables partials.weather accesible
    next();
});


app.get('/plantillas/leccion1', function(req, res){
    res.render('lecciones/leccion1',{ layout: 'layout1' });
});

app.get('/plantillas/leccion2', function (req, res) {
    res.render('lecciones/leccion2', {

        layout: 'layout1',

        currency: {
            name: 'United States dollars',
            abbrev: 'USD'
        },
        tours: [
            { name: 'Hood River', price: '$99.95' },
            { name: 'Oregon Coast', price: '$159.95' },
        ],
        specialsUrl: '/january-specials',

        currencies: [ 'USD', 'GBP', 'BTC' ] });
});


app.get('/plantillas/leccion3', function (req, res) {
    res.render('lecciones/leccion3', {

        layout: 'layout1',

        locations: require('./weather').getWeatherData().locations });
});

app.get('/plantillas/leccion4', function (req, res) {
    res.render('lecciones/leccion4', {

        layout: 'layout1' });
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