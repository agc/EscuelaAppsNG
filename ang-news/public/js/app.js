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

app.constant("usuarioUrl","api/usuarios/")

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
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl'
        })
        .when('/usuarios', {
            templateUrl: 'views/usuarios.html',
            controller: 'UsuarioCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
