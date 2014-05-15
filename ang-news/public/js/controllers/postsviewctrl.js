'use strict';

app.controller('PostViewCtrl', function ($scope,$resource, $routeParams,postUrl, Post) {

     console.log(postUrl);
     var post = $resource(postUrl+":id",{id:$routeParams.postId});
    $scope.post={}
     $scope.post=post.get()

});