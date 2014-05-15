'use strict';

app.controller('PostsCtrl', function ($scope,$resource,Post,postUrl,$location,estado) {


    // scope.posts tiene una referencia a un objeto
    // en el servicio estado estado.posts puede modificarse y referirse a otro objeto
    // scope.posts seguirá haciendo referencia al anterior
    $scope.posts = estado.posts;

    $scope.$on('estado.actualizado', function (event,postsnuevos) {

        $scope.posts =  estado.posts

    });

    $scope.$on('post.nuevo', function (event,postnuevo) {
        alert("Post incluido");
        //$scope.posts = estado.posts; como es una referencia se actualiza en estado

    });



    $scope.postResource= $resource(postUrl+':id',{id:"@id"}); // es innecesario, se puede usar en vez de Post

    $scope.leerPostsEnBD= function() {

        Post.query(function(posts) {


            estado.definirPosts(posts);
    });
    }

    $scope.leerPostsEnBD();



    $scope.post = {url: 'http://', title: ''};

    // este método es innecesario, ahora se manda desde navctrl.js


    $scope.submitPost = function () {

        var newPost=new Post($scope.post);// new $scope.postResource($scope.post);

            newPost.$save().then(function(nuevoPost) {

                estado.incluirPost(nuevoPost);

                $scope.post = {url: 'http://', title: ''};
               // $location.path('/posts/'+nuevoPost._id)

                return ;
            });

    };



    $scope.deletePost = function (post) {


       Post.remove({"id":post._id} , function (response) {$scope.posts.splice($scope.posts.indexOf(post), 1);})

        };


});