
//quito
// 'projectsinfo',
//    'dashboard',
//    'projects',
//    'admin',
/*  'services.breadcrumbs',
    'services.i18nNotifications',
    'services.httpRequestTracker',*/

// página 253

angular.module('app', [
    'ngRoute',
    'security',
    'services.breadcrumbs',
    'services.i18nNotifications',
    'services.httpRequestTracker'


    ]);

angular.module('app').constant('MONGOLAB_CONFIG', {baseUrl: '/databases/',dbName: 'ascrum'});


angular.module('app').constant('I18N.MESSAGES', {
    'errors.route.changeError':'Route change error',
    'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
    'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
    'crud.user.remove.error':"Something went wrong when removing user with id '{{id}}'.",
    'crud.user.save.error':"Something went wrong when saving a user...",
    'crud.project.save.success':"A project with id '{{id}}' was saved successfully.",
    'crud.project.remove.success':"A project with id '{{id}}' was removed successfully.",
    'crud.project.save.error':"Something went wrong when saving a project...",
    'login.reason.notAuthorized':"You do not have the necessary access permissions.  Do you want to login as someone else?",
    'login.reason.notAuthenticated':"You must be logged in to access this part of the application.",
    'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
    'login.error.serverError': "Ha ocurrido un problema con la autentificación: {{exception}}."
});

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    //$routeProvider.otherwise({redirectTo:'/projectsinfo'});
}]);



angular.module('app').controller('AppCtrl', ['$scope', function($scope) {


}]);

angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route', 'security', 'breadcrumbs', 'notifications', 'httpRequestTracker',
    function ($scope, $location, $route, security, breadcrumbs, notifications, httpRequestTracker) {
        $scope.location = $location;
        $scope.breadcrumbs = breadcrumbs;

        $scope.isAuthenticated = security.isAuthenticated;
        $scope.isAdmin = security.isAdmin;

        $scope.home = function () {
            if (security.isAuthenticated()) {
                $location.path('/dashboard');
            } else {
                $location.path('/projectsinfo');
            }
        };

        $scope.isNavbarActive = function (navBarPath) {
            return navBarPath === breadcrumbs.getFirst().name;
        };

        $scope.hasPendingRequests = function () {
            return httpRequestTracker.hasPendingRequests();
        };
    }]);

