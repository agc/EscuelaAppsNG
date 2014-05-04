
angular.module('resources.users', ['mongolabResource']);

angular.module('resources.users').factory('Users', ['mongolabResource', function (mongoResource) {

    var userResource = mongoResource('users');
    userResource.prototype.getFullName = function () {
        return this.lastName + " " + this.firstName + " (" + this.email + ")";
    };

    return userResource;
}]);

angular.module('admin-users', [

    'services.crud'
])

    .config(['crudRouteProvider', function (crudRouteProvider) {

        crudRouteProvider.routesFor('Users', 'admin')
            .whenList({
                users: ['Users', function(Users) { return Users.all(); }]
                //currentUser: securityAuthorizationProvider.requireAdminUser
            })
            .whenNew({
                user: ['Users', function(Users) { return new Users(); }]
                //currentUser: securityAuthorizationProvider.requireAdminUser
            })
            .whenEdit({
                user:['$route', 'Users', function ($route, Users) {
                    return Users.getById($route.current.params.itemId);
                }]
                //currentUser: securityAuthorizationProvider.requireAdminUser
            });
    }]);
