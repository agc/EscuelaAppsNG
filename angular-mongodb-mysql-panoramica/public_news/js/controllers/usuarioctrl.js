'use strict';

app.controller('UsuarioCtrl',
    function ($scope,  Usuario,GestionUsuarios) {


        $scope.mensaje=GestionUsuarios.obtener('537b330df84828d44f734b20');

        $scope.actualizarListaUsuarios= function() {


            $scope.usuarios=Usuario.query(function(usuarios) {


               $scope.usuarios=usuarios;


            });
        }

        $scope.actualizarListaUsuarios();




    }
);