'use strict';

app.controller('NavCtrl', function ($scope, $location, Post,estado,Auth) {

    $scope.post = {url: 'http://', title: ''};

    $scope.signedIn=Auth.signedIn();

    $scope.usuario=Auth.user;


    $scope.submitPost = function () {



        var newPost=new Post($scope.post);// new $scope.postResource($scope.post);

        newPost.$save().then(function(nuevoPost) {

            estado.incluirPost(nuevoPost);

            $scope.post = {url: 'http://', title: ''};
           // $location.path('/posts/'+nuevoPost._id)

            return ;
        });

    };

});