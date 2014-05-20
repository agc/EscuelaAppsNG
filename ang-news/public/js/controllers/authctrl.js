'use strict';

app.controller('AuthCtrl',
    function ($scope, $location, Auth) {

        $scope.error="Inicial";

        if (Auth.signedIn()) {
            $location.path('/');
        }

        $scope.$on('$firebaseSimpleLogin:login', function() {
            $location.path('/');
        });

        $scope.login = function () {
            Auth.login($scope.user).then(function() {
                console.log();
                $location.path('/');
            }, function (error) {
                $scope.error = error.toString();
            });
        };

        //Auth.register comprueba si existe el usuario
        // si no existe invoca la función que se pasa a then

        $scope.register = function() {
            Auth.register($scope.user).then(
                function (authUser) {
                console.log(authUser);
              //  User.create(authUser, $scope.user.username);
                $location.path('/');
            }, function (error) {
               //d $location.path('/');
                $scope.error = error.toString();
            });
        };
    }
);