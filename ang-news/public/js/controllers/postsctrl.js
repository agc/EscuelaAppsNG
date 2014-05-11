'use strict';

app.controller('PostsCtrl', function ($scope,$resource,Post,postUrl,$location) {

    $scope.posts = {}; //version inicial

    $scope.postResource= $resource(postUrl+':id',{id:"@id"}); // es innecesario, se puede usar en vez de Post

    $scope.listPosts= function() {
        Post.query(function(posts) {$scope.posts.datos=posts});
    };

    $scope.listPosts();



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



    $scope.deletePost = function (post) {



       Post.remove({"id":post._id} , function (response) {$scope.posts.datos.splice($scope.posts.datos.indexOf(post), 1);})

        };


});