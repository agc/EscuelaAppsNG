angular.module('Vinos').config(['$routeProvider', function($routeProvider) {



    $routeProvider
        .when('/wines',
        {
            templateUrl: 'tpl/cellar/welcome.html'
        })
        .when('/wines/:wineId',
        {
            templateUrl: 'tpl/cellar/wine-details.html',
            controller: 'WineDetailCtrl'
        }
    )
        .otherwise({redirectTo: '/wines'})



}
    ])
