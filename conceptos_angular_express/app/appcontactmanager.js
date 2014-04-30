'use strict';

/* Controllers */

var cm =angular.module('contactManager', ['ngRoute','filters']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:'ListController', templateUrl:'parciales/list.html'}).
            when('/contacts/', {controller:'ListController', templateUrl:'parciales/list.html'}).
            when('/contacts/:id', {controller:'ViewController', templateUrl:'parciales/contact.html'}).
            when('/add/', {controller:'AddController', templateUrl:'parciales/add.html'}).
            otherwise({redirectTo:'/'});
    });


cm.controller('ListController', ['$scope','$http',
    function ($scope, $http) {
        $scope.headers = ["name", "phone"];

        $scope.columnSort={sortColumn:'name',reverse:false};

        $http({method: 'jsonp', url: 'http://localhost:3000/contacts?callback=JSON_CALLBACK'})
            .success(function(data, status, headers, config) {
            $scope.contacts = data;
            }).
            error(function(data, status, headers, config) {
                //handle error
            });
    }]);

cm.controller('ViewController', ['$scope','$http','$routeParams',
function ($scope, $http, $routeParams) {
    $http({method: 'jsonp', url: 'http://localhost:3000/contacts/' + $routeParams.id + '?callback=JSON_CALLBACK'})
        .success(function(data, status, headers, config) {
        $scope.contact = data;
    }).
        error(function(data, status, headers, config) {
            //do something to handle the error
        });
}]);


cm.controller('AddController', ['$scope','$http','$location',
function AddController($scope, $http, $location) {
    $scope.form = {};
    $scope.addContact = function () {
        $http.post('http://localhost:3000/contacts', $scope.form).
            success(function(data) {
                $location.path('/');
            });
    };
}]);


angular.module("filters", []).filter('capitalise', function() {
    return function(input) {
        if(input != null)
            return input.substring(0,1).toUpperCase() + input.substring(1);
    }
});



