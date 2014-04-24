var brands = require('../app_server/controllers/brands'),
    countries = require('../app_server/controllers/countries'),
    adverts = require('../app_server/controllers/adverts');

module.exports = function(app){

    app.get('/api/brands', brands.findAll);

    app.get('/api/countries', countries.findAll);

    app.get('/api/adverts', adverts.findAll);
    app.get('/api/adverts/:id', adverts.findById);
    app.post('/api/adverts', adverts.add);
    app.put('/api/adverts/:id', adverts.update);
    app.delete('/api/adverts/:id', adverts.remove);
};