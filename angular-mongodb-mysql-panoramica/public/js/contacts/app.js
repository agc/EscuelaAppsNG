'use strict';

var cm =angular.module('contactManager', ['ngRoute','filters']).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:'ListController', templateUrl:'ngviews/contacts/list.html'}).
            when('/contacts/', {controller:'ListController', templateUrl:'ngviews/contacts/list.html'}).
            when('/contacts/:id', {controller:'ViewController', templateUrl:'ngviews/contacts/contact.html'}).
            when('/add/', {controller:'AddController', templateUrl:'ngviews/contacts/add.html'}).
            otherwise({redirectTo:'/'});
    });






