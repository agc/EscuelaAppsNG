angular.module('Vinos').config(['$routeProvider', function($routeProvider) {

/* rutas absolutas o rutas relativas */
    /*
    /vistas/ngviews/wine/....
    o
    ngviews/wine

    para que lo busque dentro de la carpeta en la que se sirve index
    */

    $routeProvider
        .when('/wines',
        {
            templateUrl: 'ngviews/wine/welcome.html'
        })
        .when('/wines/:wineId',
        {
            templateUrl: 'ngviews/wine/wine-details.html',
            controller: 'WineDetailCtrl'
        }
    )
        .otherwise({redirectTo: '/wines'})



}
    ])
