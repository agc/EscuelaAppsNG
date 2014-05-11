'use strict';
/* global app:true */

var app=angular
  .module('angNewsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ]);

 //app.constant("postUrl","http://192.168.1.60:3000/api/posts/");
app.constant("postUrl","api/posts/");

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
        .when('/posts/:postId', {
            templateUrl: 'views/showpost.html',
            controller: 'PostViewCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
