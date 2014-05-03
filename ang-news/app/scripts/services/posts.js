'use  strict';

app.factory('Post', function ($resource) {
    return $resource('https://dazzling-fire-6637.firebaseio.com/posts/:id.json');


});