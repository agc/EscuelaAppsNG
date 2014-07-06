'use strict'

app.factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore', function($http, $location, $rootScope, $cookieStore){
	// express middleware will create a user cookie for each request
	$rootScope.currentUser = $cookieStore.get('user')
	$cookieStore.remove('user')

	var Auth = {
		login: function(userInfo){
			return $http.post('/api/login', userInfo)
				.success(function(data){
					$rootScope.currentUser = data
					$location.path('/')

					console.log('currentUser: ' + $rootScope.currentUser)
					toastr.success('Login successful')
				})
				.error(function(){
					toastr.error('Invalid email or password')
				})
		},
		signup: function(userInfo){
			return $http.post('/api/signup', userInfo)
				.success(function(){
					$location.path('/login')

					toastr.success('Account created')
					// should log user in and direct to homepage..
				})
				.error(function(response){
					toastr.error('Error creating account')
				})
		},
		logout: function(){
			return $http.get('/api/logout').success(function(){
				$rootScope.currentUser = null
				$cookieStore.remove('user')

				toastr.info('Logout successful')
			})
		}
	}

	return Auth
}])