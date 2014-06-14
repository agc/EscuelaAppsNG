var ctrl = require('./controllers/ctrl_locations');

module.exports = function(router){

    router.get('/location',             ctrl.locationInfo);
    router.get('/location/review/new',  ctrl.addReview);
};