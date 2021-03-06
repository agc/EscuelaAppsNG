//Setting up route

angular.module('ngFantasyFootball').config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/',
        {
            templateUrl: 'views/index.html'
        })
        .when('/nflteams',
        {
            templateUrl: 'views/nfl/list.html'
        })
        .when('/nflteams/:nflTeamId',
        {
            templateUrl: 'views/nfl/view.html'
        })
        .when('/leagues',
        {
            templateUrl: 'views/leagues/list.html'
        })
        .when('/leagues/create',
        {
            templateUrl: 'views/leagues/create.html'
        })
        .when('/leagues/:leagueId/edit',
        {
            templateUrl: 'views/leagues/edit.html'
        })
        .when('/leagues/:leagueId',
        {
            templateUrl: 'views/leagues/view.html'
        })
        .when('/fantasyteams',
        {
            templateUrl: 'views/fantasyteams/list.html'
        })
        .when('/fantasyteams/create',
        {
            templateUrl: 'views/fantasyteams/create.html'
        })
        .when('/fantasyteams/:fantasyTeamId/edit',
        {
            templateUrl: 'views/fantasyteams/edit.html'
        })
        .when('/fantasyteams/:fantasyTeamId',
        {
            templateUrl: 'views/fantasyteams/view.html'
        })
        .when('/players',
        {
            templateUrl: 'views/players/list.html'
        })
        .when('/properties',
        {
            templateUrl: 'views/properties/list.html'
        })
        .when('/properties/create',
        {
            templateUrl: 'views/properties/create.html'
        })
        .when('/properties/:propertyId/edit',
        {
            templateUrl: 'views/properties/edit.html'
        })
        .when('/properties/:propertyId',
        {
            templateUrl: 'views/properties/view.html'
        })
        .otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
angular.module('ngFantasyFootball').config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
angular.module('ngFantasyFootball').config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);