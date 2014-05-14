'use strict';

app.controller('NavCtrl', function ($scope, $location, Post) {
    $scope.post = {url: 'http://', title: ''};



    $scope.submitPost = function () {



        var newPost=new Post($scope.post);// new $scope.postResource($scope.post);

        newPost.$save().then(function(nuevoPost) {


            $scope.posts.datos.push(nuevoPost);

            $scope.post = {url: 'http://', title: ''};
            $location.path('/posts/'+nuevoPost._id)

            return ;
        });

    };

});