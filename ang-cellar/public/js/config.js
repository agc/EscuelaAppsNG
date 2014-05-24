angular.module('Vinos').config(['$routeProvider', function($routeProvider) {



    $routeProvider
        .when('/wines',
        {
            templateUrl: 'tpl/welcome.html'
        })
        .when('/wines/:wineId',
        {
            templateUrl: 'tpl/wine-details.html',
            controller: 'WineDetailCtrl'
        }
    )
        .otherwise({redirectTo: '/wines'})



}
    ])
