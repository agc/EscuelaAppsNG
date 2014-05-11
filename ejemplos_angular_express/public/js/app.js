angular.module('project', ['restangular', 'ngRoute']).
    constant("apiUrl",'http://192.168.1.61:3000/api').
    config(function($routeProvider, RestangularProvider,apiUrl) {
        $routeProvider.
            when('/', {
                controller:ListCtrl,
                templateUrl:'list.html'
            }).
            when('/edit/:projectId', {
                controller:EditCtrl,
                templateUrl:'detail.html',
                resolve: {
                    project: function(Restangular, $route){
                        return Restangular.one('projects', $route.current.params.projectId).get();
                    }
                }
            }).
            when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
            otherwise({redirectTo:'/'});

        /*
        RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/angularjs/collections');
        RestangularProvider.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })
        RestangularProvider.setRestangularFields({
            id: '_id.$oid'
        });
        */
        RestangularProvider.setBaseUrl(apiUrl);


        RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

            if (operation === 'putd') {
                elem._id = undefined;
                return elem;
            }
            return elem;
        });


        RestangularProvider.addFullRequestInterceptor(function (elem, operation, what,url) {

            if (operation === 'put') {
                return url+'/'+elem._id;
            }
            });
    });


function ListCtrl($scope, Restangular) {
    $scope.projects = Restangular.all("projects").getList().$object;

}


function CreateCtrl($scope, $location, Restangular) {
    $scope.save = function() {
        Restangular.all('projects').post($scope.project).then(function(project) {
            $location.path('/list');
        });
    }
}

function EditCtrl($scope, $location, Restangular, project) {
    var original = project;
    $scope.project =  Restangular.copy(original);


    $scope.isClean = function() {
        return angular.equals(original, $scope.project);
    }

    $scope.destroy = function() {
        original.remove().then(function() {
            $location.path('/list');
        });
    };

    $scope.save = function() {
        var proyecto = $scope.project;

        var nuevoProyecto=Restangular.one("projects", proyecto._id);
        nuevoProyecto.name=proyecto.name;
        nuevoProyecto.site=proyecto.site;
        nuevoProyecto.description=proyecto.description;

        nuevoProyecto.put().then(function() {
            $location.path('/');
        });

     /*   Restangular.one("api/projects",id).put($scope.project).then(function() {
            $location.path('/');
        });*/

       /* Restangular.one("projects", proyecto._id).put({name:proyecto.name,site:proyecto.site,description:proyecto.description}).
        then(function() {
            $location.path('/');
        });*/

        /*$scope.project.put({"_id": id}).then(function() {
            $location.path('/');
        });*/
    };
}