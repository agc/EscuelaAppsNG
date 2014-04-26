var ctrl= require('../app_server/controllers/main');

module.exports= function(app) {

    app.get('/about', ctrl.about);

    app.get('/entrada',ctrl.entrada); /* se puede añadir aqui la funcion en lugar a exportarla desde un modulo */

}