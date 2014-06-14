var brands =    require('./controllers/ctrl_brands'),
    countries = require('./controllers/ctrl_countries'),
    adverts =   require('./controllers/ctrl_adverts');

module.exports = function(router){

    router.get('/api/brands',           brands.findAll);

    router.get('/api/countries',        countries.findAll);

    router.get('/api/adverts',          adverts.findAll);
    router.get('/api/adverts/:id',      adverts.findById);
    router.post('/api/adverts',         adverts.add);
    router.put('/api/adverts/:id',      adverts.update);
    router.delete('/api/adverts/:id', adverts.remove);
};