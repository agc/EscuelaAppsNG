// before using, install CouchDB 1.3 on localhost, enable CORS, create a database named "projects"

angular.module('project', ['CouchDB','ngRoute']).
    config(function($routeProvider,$httpProvider) {
        $routeProvider.
            when('/', {controller:ListCtrl, templateUrl:'list.html'}).
            when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
            when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
            otherwise({redirectTo:'/'});

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })



function ListCtrl($scope, ProjectCouch) {
    $scope.projects = ProjectCouch.get({q:'_all_docs', include_docs: 'true', limit: 10});
}

function CreateCtrl($scope, $location, ProjectCouch) {
    $scope.save = function() {
        ProjectCouch.save($scope.project, function(project) {
            $location.path('/edit/' + project.id);
        });
    }
}

function EditCtrl($scope, $location, $routeParams, ProjectCouch) {
    var self = this;

    ProjectCouch.get({q: $routeParams.projectId}, function(project) {
        self.original = project;
        $scope.project = new ProjectCouch(self.original);
    });

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.project);
    }

    $scope.destroy = function() {
        self.original.destroy(function() {
            $location.path('/');
        });
    };

    $scope.save = function() {
        $scope.project.update(function() {
            $location.path('/');
        });
    };
}

angular.module('CouchDB', ['ngResource']).
    factory('ProjectCouch', function($resource) {
        var ProjectCouch = $resource(':protocol//:server/:db/:q/:r/:s/:t',
            {protocol: 'http:', server: 'localhost:5984', db: 'projects'}, {update: {method:'PUT'}
            }
        );

        ProjectCouch.prototype.update = function(cb) {
            return ProjectCouch.update({q: this._id}, this, cb);
        };

        ProjectCouch.prototype.destroy = function(cb) {
            return ProjectCouch.remove({q: this._id, rev: this._rev}, cb);
        };

        return ProjectCouch;
    });
