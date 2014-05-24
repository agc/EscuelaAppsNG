angular.module('Vinos.Controllers',['Vinos.Services','ngRoute'])
    .controller('RouteCtrl',['$scope',function($scope) {

        $scope.addWine = function () {
            window.location = "#/wines/add";
        }
    }])
    .controller('WineListCtrl',['$scope', 'Wine',
        function($scope,Wine) {
             var wines= Wine.query(function() {$scope.wines=wines});
        }])
    .controller('WineDetailCtrl',['$scope','Wine','$routeParams',function($scope,Wine,$routeParams) {

        $scope.wine = Wine.get({wineId:$routeParams.wineId});


        $scope.saveWine = function () {

            if ($scope.wine.id > 0)
               // $scope.wine.$update({wineId:$scope.wine.id});
                Wine.update({wineId:$scope.wine.id}, $scope.wine)

            else
                Wine.create($scope.wine)
               // $scope.wine.$save();
            window.location = "#/wines";
        }

        $scope.deleteWine = function () {

            $scope.wine.$delete(
                {wineId:$scope.wine.id},
                function() {
                alert('Wine ' + wine.name + ' deleted')
                window.location = "#/wines";
                });
        }
    }])


