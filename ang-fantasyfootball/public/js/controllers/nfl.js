angular.module('ngff.controllers.nfl', [])
    .controller('NFLController', ['$scope','$routeParams','Global','NFL',
        function($scope, $routeParams, Global, NFL) {
            $scope.mensaje="Hola"
            $scope.global = Global;

            $scope.nflteams = NFL.teams;
            $scope.nflteam = NFL.teams[$routeParams['nflTeamId']];
        }]);