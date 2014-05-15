app.factory('estado', function ($rootScope) {
        'use strict';

        var posts=["Inicial "];

        var definirPosts = function (nuevosposts) {

            this.posts = nuevosposts;
            $rootScope.$broadcast('estado.actualizado', nuevosposts);

        };

        var incluirPost= function(post) {
            this.posts.push(post);
            $rootScope.$broadcast('post.nuevo', post);


        };

        return {

            posts: posts,
            definirPosts:definirPosts,
            incluirPost:incluirPost

        };
    });
