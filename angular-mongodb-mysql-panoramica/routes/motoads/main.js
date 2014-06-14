var ctrl= require('./controllers/ctrl_main');

module.exports= function(router) {

    router.get('/about',        ctrl.about);

    router.get('/entrada',      ctrl.entrada);

}