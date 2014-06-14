'use strict';

app.factory('Auth',
    function ( $rootScope) {


        var Auth = {

             //user :{email:"agalveca@gmail.com",password:"*********"},
             user:{},

            register: function (user) {
                // comprueba si existe
                var user={email:"agalveca@gmail.com",password:"*********"}
                var promesa= {
                    then: function (exito, fracaso) {

                        var error="Error de creación de usuario"

                        if (!( _.isEmpty(user))) {
                            exito(user);

                        } else {

                            fracaso(error);
                        }


                    }
                }

                return promesa;

               // return auth.$createUser(user.email, user.password);
            },
            signedIn: function () {
               //return this.user !== null;
                // emitir evento $firebaseSimpleLogin:login
                return !( _.isEmpty(this.user));
            },
            login: function (user) {
               this.user=user;
                // aqui debería haber una conexión con la base de datos para comprobar
                // el usuario

                var error="Error de autentificación"

                var promesa={
                    then:function(exito,fracaso){

                       if (!( _.isEmpty(this.user))) {
                           exito(this.user);

                       } else {

                           fracaso(error);
                       }


                    }
                }

                return promesa;

            },
            logout: function () {
              this.user={}

            }
        };

        $rootScope.signedIn = function () {
            return Auth.signedIn();
        };

        return Auth;
    });

