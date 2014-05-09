'use strict';

app.controller('PostsCtrl', function ($scope,Post) {

    // $scope.posts = []; version inicial

    $scope.listPosts= function() {
        $scope.posts=Post.query();
    };

    $scope.listPosts();



    $scope.post = {url: 'http://', title: ''};

    $scope.submitPost = function () {




        Post.save({}, $scope.post,function (response) {
            $scope.posts.push(nuevoProducto);
            //$scope.posts[ref.name] = $scope.post;
            $scope.post = {url: 'http://', title: ''};
            $scope.listPosts();
        });
    };



    $scope.deletePost = function (id) {
        Post.remove({"_id": id}, function () {
            //delete $scope.posts[postId];
            Post.query(function (datos){$scope.posts=datos});
        });
    };

});