'use strict'

app.factory('Show', ['$resource', function($resource){
	return $resource('/api/shows/:showId', {}, {
		update: {
			method: 'PUT'
		}
	})
}])