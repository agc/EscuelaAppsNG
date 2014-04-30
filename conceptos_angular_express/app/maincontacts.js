'use strict';

var cm =angular.module('contactManager', ['ngRoute','filters']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:'ListController', templateUrl:'parciales/list.html'}).
            when('/contacts/', {controller:'ListController', templateUrl:'parciales/list.html'}).
            when('/contacts/:id', {controller:'ViewController', templateUrl:'parciales/contact.html'}).
            when('/add/', {controller:'AddController', templateUrl:'parciales/add.html'}).
            otherwise({redirectTo:'/'});
    });






