angular.module('Vinos').config(['$routeProvider', function($routeProvider) {



    $routeProvider
        .when('/wines',
        {
            templateUrl: 'views/cellar/welcome.html'
        })
        .when('/wines/:wineId',
        {
            templateUrl: 'views/cellar/wine-details.html',
            controller: 'WineDetailCtrl'
        }
    )
        .otherwise({redirectTo: '/wines'})



}
    ])
