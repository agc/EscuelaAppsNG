'use strict';

var motoAdsApp = angular.module('motoAdsApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'motoAdsServices']);

motoAdsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
            when('/', {
              controller: 'AdvertsController',
              templateUrl: 'vistas/adverts.html'
            }).
            when('/addAdvert', {
              controller: 'AddAdvertController',
              templateUrl: 'vistas/addAdvert.html'
            }).
            when('/editAdvert/:advertId', {
              controller: 'EditAdvertController',
              templateUrl: 'vistas/editAdvert.html'
            });
  }]);