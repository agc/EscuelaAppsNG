var ctrl = require('../app_server/controllers/locations');

module.exports = function(app){
   // app.get('/', ctrl.homelist);
  /*  app.get('/',function(req, res){
        res.sendfile('index.html', { root: __dirname + "/../public" } ); // así se puede poner otra ruta
    });*/
    app.get('/location', ctrl.locationInfo);
    app.get('/location/review/new', ctrl.addReview);
};