'use strict';

app.factory('Auth',
    function ( $rootScope) {


        var Auth = {

             //user :{email:"agalveca@gmail.com",password:"*********"},
             user:{email:"agalveca@gmail.com",password:"****"},
            register: function (user) {

               // return auth.$createUser(user.email, user.password);
            },
            signedIn: function () {
               //return this.user !== null;
                return !( _.isEmpty(this.user));
            },
            login: function (user) {
               this.user=user;
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

