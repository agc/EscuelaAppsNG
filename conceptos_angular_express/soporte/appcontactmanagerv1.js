'use strict';

/* Controllers */

var cm = angular.module('contactManager', []);

cm.controller('ListController', ['$scope',
    function($scope) {
        $scope.headers = ["name", "phone"];

        $scope.contacts = [
            { "name" : "Tamas Piros", "phone" : "123456" },
            { "name" : "Uncle Joe", "phone" : "088882" }
        ];

    }]);

