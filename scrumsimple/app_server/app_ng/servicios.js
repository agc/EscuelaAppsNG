angular.module('services.localizedMessages', []).factory('localizedMessages', ['$interpolate', 'I18N.MESSAGES', function ($interpolate, i18nmessages) {

    var handleNotFound = function (msg, msgKey) {
        return msg || '?' + msgKey + '?';
    };

    return {
        get : function (msgKey, interpolateParams) {
            var msg =  i18nmessages[msgKey];
            if (msg) {
                return $interpolate(msg)(interpolateParams);
            } else {
                return handleNotFound(msg, msgKey);
            }
        }
    };
}]);

angular.module('services.i18nNotifications', ['services.notifications', 'services.localizedMessages']);
angular.module('services.i18nNotifications').factory('i18nNotifications', ['localizedMessages', 'notifications', function (localizedMessages, notifications) {

    var prepareNotification = function(msgKey, type, interpolateParams, otherProperties) {
        return angular.extend({
            message: localizedMessages.get(msgKey, interpolateParams),
            type: type
        }, otherProperties);
    };

    var I18nNotifications = {
        pushSticky:function (msgKey, type, interpolateParams, otherProperties) {
            return notifications.pushSticky(prepareNotification(msgKey, type, interpolateParams, otherProperties));
        },
        pushForCurrentRoute:function (msgKey, type, interpolateParams, otherProperties) {
            return notifications.pushForCurrentRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
        },
        pushForNextRoute:function (msgKey, type, interpolateParams, otherProperties) {
            return notifications.pushForNextRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
        },
        getCurrent:function () {
            return notifications.getCurrent();
        },
        remove:function (notification) {
            return notifications.remove(notification);
        }
    };

    return I18nNotifications;
}]);

angular.module('services.notifications', []).factory('notifications', ['$rootScope', function ($rootScope) {

    var notifications = {
        'STICKY' : [],
        'ROUTE_CURRENT' : [],
        'ROUTE_NEXT' : []
    };
    var notificationsService = {};

    var addNotification = function (notificationsArray, notificationObj) {
        if (!angular.isObject(notificationObj)) {
            throw new Error("Only object can be added to the notification service");
        }
        notificationsArray.push(notificationObj);
        return notificationObj;
    };

    $rootScope.$on('$routeChangeSuccess', function () {
        notifications.ROUTE_CURRENT.length = 0;

        notifications.ROUTE_CURRENT = angular.copy(notifications.ROUTE_NEXT);
        notifications.ROUTE_NEXT.length = 0;
    });

    notificationsService.getCurrent = function(){
        return [].concat(notifications.STICKY, notifications.ROUTE_CURRENT);
    };

    notificationsService.pushSticky = function(notification) {
        return addNotification(notifications.STICKY, notification);
    };

    notificationsService.pushForCurrentRoute = function(notification) {
        return addNotification(notifications.ROUTE_CURRENT, notification);
    };

    notificationsService.pushForNextRoute = function(notification) {
        return addNotification(notifications.ROUTE_NEXT, notification);
    };

    notificationsService.remove = function(notification){
        angular.forEach(notifications, function (notificationsByType) {
            var idx = notificationsByType.indexOf(notification);
            if (idx>-1){
                notificationsByType.splice(idx,1);
            }
        });
    };

    notificationsService.removeAll = function(){
        angular.forEach(notifications, function (notificationsByType) {
            notificationsByType.length = 0;
        });
    };

    return notificationsService;
}]);

angular.module('services.breadcrumbs', []);
angular.module('services.breadcrumbs').factory('breadcrumbs', ['$rootScope', '$location', function($rootScope, $location){

    var breadcrumbs = [];
    var breadcrumbsService = {};

    //we want to update breadcrumbs only when a route is actually changed
    //as $location.path() will get updated imediatelly (even if route change fails!)
    $rootScope.$on('$routeChangeSuccess', function(event, current){

        var pathElements = $location.path().split('/'), result = [], i;
        var breadcrumbPath = function (index) {
            return '/' + (pathElements.slice(0, index + 1)).join('/');
        };

        pathElements.shift();
        for (i=0; i<pathElements.length; i++) {
            result.push({name: pathElements[i], path: breadcrumbPath(i)});
        }

        breadcrumbs = result;
    });

    breadcrumbsService.getAll = function() {
        return breadcrumbs;
    };

    breadcrumbsService.getFirst = function() {
        return breadcrumbs[0] || {};
    };

    return breadcrumbsService;
}]);

angular.module('services.httpRequestTracker', []);
angular.module('services.httpRequestTracker').factory('httpRequestTracker', ['$http', function($http){

    var httpRequestTracker = {};
    httpRequestTracker.hasPendingRequests = function() {
        return $http.pendingRequests.length > 0;
    };

    return httpRequestTracker;
}]);