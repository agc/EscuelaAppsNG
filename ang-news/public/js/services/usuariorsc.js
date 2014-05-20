'use  strict';

app.factory('Usuario', function ($resource,usuarioUrl) {

    var User= $resource(usuarioUrl+':id',{id:"@id"},
        { 'get':    {method:'GET'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'} });




    return User;


});

