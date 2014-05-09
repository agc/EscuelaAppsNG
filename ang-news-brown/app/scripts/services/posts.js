'use  strict';

app.factory('Post', function ($resource,postUrl) {
    //return $resource('https://dazzling-fire-6637.firebaseio.com/posts/:id.json');
    return $resource(postUrl+':id',{id:"@id"});


});