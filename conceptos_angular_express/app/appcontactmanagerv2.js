'use strict';

/* Controllers */

var cm = angular.module('contactManager', ['filters']);

cm.controller('ListController', ['$scope','$http',
    function ($scope, $http) {
        $scope.headers = ["name", "phone"];
        $scope.columnSort={sortColumn:'name',reverse:false};
        $http({method: 'jsonp', url: 'http://localhost:1222/contacts?callback=JSON_CALLBACK'})
            .success(function(data, status, headers, config) {
            $scope.contacts = data;
            }).
            error(function(data, status, headers, config) {
                //handle error
            });
    }]);


angular.module("filters", []).filter('capitalise', function() {
    return function(input) {
        if(input != null)
            return input.substring(0,1).toUpperCase() + input.substring(1);
    }
});



