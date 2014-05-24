angular.module('Vinos.Services',['ngResource'])
.factory('Wine', function ($resource) {
    return $resource('api/wines/:wineId', {}, {

    });
});
