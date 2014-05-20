'use  strict';

app.factory('Usuario', function ($resource,usuarioUrl) {

    var User= $resource(usuarioUrl+':id',{id:"@id"},{
        query: { method: "GET", isArray:true },
        get:  {  method: "GET",isArray:false }} );


    return User;


});

app.factory('GestionUsuarios', function (Usuario) {

        var servicio={
            saludo:function() {return "CCCCCC"},
            obtener:function(id) {
               return  Usuario.get({id:id}); // no es sincrono aunque lo parezca
            }
        }


        return servicio;

    }

);

