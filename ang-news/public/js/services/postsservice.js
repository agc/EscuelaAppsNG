'use  strict';

app.factory('Post', function ($resource,postUrl) {

    return $resource(postUrl+':id',{id:"@id"});


});