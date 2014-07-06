'use strict'

app.controller('MainCtrl', ['$scope', 'Show', function($scope, Show){
	$scope.genres = ['Action', 'Adventure', 'Animation', 'Children', 'Comedy',
      'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Food',
      'Home and Garden', 'Horror', 'Mini-Series', 'Mystery', 'News', 'Reality',
      'Romance', 'Sci-Fi', 'Sport', 'Suspense', 'Talk Show', 'Thriller',
      'Travel'];

    $scope.headingTitle = '<-- Select a category'
    $scope.shows = Show.query()

    $scope.filterByGenre = function(genre){
    	$scope.shows = Show.query({ genre: genre })
    	$scope.headingTitle = genre
    }
	
}])