angular.module('Vinos.Services',['ngResource'])
.factory('Wine', function ($resource) {
    return $resource('api/wines/:wineId', {}, {
        create: { method: 'POST' },
        update: { method: 'PUT' }

    });
});
