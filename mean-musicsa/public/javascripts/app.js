'use strict'

var app = angular.module('tvtrackr', [
	'ngCookies', 
	'ngResource', 
	'ui.router', 
	'mgcrea.ngStrap'	// angular-strap
])

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider){

	$locationProvider.html5Mode(true).hashPrefix('!')

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		// Shows
		.state('shows', {
			url: '/shows',
			template: "<div class='container' ui-view></div>"
		})
		.state('shows.add', {
			url: '/add',
			templateUrl: 'views/shows/add.html',
			controller: 'AddShowCtrl'
		})
		// .state('shows.details', {
		// 	url: '/:showId',
		// 	templateUrl: 'views/shows/details.html',
		// 	controller: 'ShowDetailsCtrl'
		// })

		// Authentication
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		})

		.state('signup', {
			url: '/signup',
			templateUrl: 'views/signup.html',
			controller: 'SignupCtrl'
		})

		$urlRouterProvider.otherwise('/')
}])