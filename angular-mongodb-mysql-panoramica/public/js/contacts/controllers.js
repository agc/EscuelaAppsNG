angular.module('contactManager')
.controller('ListController', ['$scope','$http',
    function ($scope, $http) {
        $scope.headers = ["name", "phone"];

        $scope.columnSort={sortColumn:'name',reverse:false};

        $http({method: 'jsonp', url: 'http://localhost:3000/api/contacts?callback=JSON_CALLBACK'})
            .success(function(data, status, headers, config) {
                $scope.contacts = data;
            }).
            error(function(data, status, headers, config) {
                //handle error
            });
    }])

.controller('ViewController', ['$scope','$http','$routeParams',
    function ($scope, $http, $routeParams) {
        $http({method: 'jsonp', url: 'http://localhost:3000/api/contacts/' + $routeParams.id + '?callback=JSON_CALLBACK'})
            .success(function(data, status, headers, config) {
                $scope.contact = data;
            }).
            error(function(data, status, headers, config) {
                //do something to handle the error
            });
    }])


.controller('AddController', ['$scope','$http','$location',
    function AddController($scope, $http, $location) {
        $scope.form = {};
        $scope.addContact = function () {
            $http.post('http://localhost:3000/api/contacts', $scope.form).
                success(function(data) {
                    $location.path('/');
                });
        };
    }]);