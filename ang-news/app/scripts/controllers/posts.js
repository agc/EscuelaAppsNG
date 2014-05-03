'use strict';

app.controller('PostsCtrl', function ($scope,Post) {

    // $scope.posts = []; version inicial

    $scope.posts=Post.get();  //version con firebase

    $scope.post = {url: 'http://', title: ''};

    $scope.submitPost = function () {
       // $scope.posts.push($scope.post); version inicial

        Post.save($scope.post, function (ref) {
            $scope.posts[ref.name] = $scope.post;
            $scope.post = {url: 'http://', title: ''};
        });
    };



    $scope.deletePost = function (postId) {
        Post.delete({id: postId}, function () {
            delete $scope.posts[postId];
        });
    };

});