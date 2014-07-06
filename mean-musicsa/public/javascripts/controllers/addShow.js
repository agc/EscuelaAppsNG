'use strict'

app.controller('AddShowCtrl', ['$scope', '$q', 'Show', function($scope, $q, Show){
	$scope.addShow = function(){
		var dfd = $q.defer()

        // save to database
		Show.save({ name: $scope.showName }, function(){
			dfd.resolve()
			toastr.success($scope.showName + ' added!')
		}, function(response){
			dfd.resolve()
			toastr.error('Error adding show: ' + response.data.message)
		})

		// reset form
		dfd.promise.then(function(){
			$scope.showName = ''
	        $scope.addForm.$setPristine()
		})
	}
}])