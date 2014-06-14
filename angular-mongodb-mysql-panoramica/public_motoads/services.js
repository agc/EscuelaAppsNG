'use strict';

var motoAdsServices = angular.module('motoAdsServices', ['ngResource']);

motoAdsServices.factory('Brand', ['$resource', function($resource) {
    return $resource('/motoads/api/brands', {}, {});
  }]);

motoAdsServices.factory('Country', ['$resource', function($resource) {
    return $resource('/motoads/api/countries', {}, {});
  }]);

motoAdsServices.factory('Advert', ['$resource', function($resource) {
    return $resource('/motoads/api/adverts/:advertId', {}, {
       update: {method:'PUT', params: {advertId: '@_id'}}
    });
  }]);