
angular.module('todoController', [])


    .controller('mainController', function($scope, $http, Todos) {
        $scope.formData = {};

        // Cuando se cargue la página, pide del API todos los TODOs
        Todos.get()
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        ;


        $scope.createTodo = function() {


            if (!$.isEmptyObject($scope.formData)) {


                Todos.create($scope.formData)


                    .success(function(data) {
                        $scope.formData = {};
                        $scope.todos = data;
                    });
            }
        };


        $scope.deleteTodo = function(id) {
            Todos.delete(id)

                .success(function(data) {
                    $scope.todos = data; // assign our new list of todos
                });
        };
    });

