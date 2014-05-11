angular.module('Hubbub', ['restangular']).
    constant("apiUrl",'http://192.168.1.61:3000/api').
    config(
    function(RestangularProvider,apiUrl) {
        RestangularProvider.setBaseUrl(apiUrl);
//        RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
//            var retElem = elem;
//            if (operation === 'put') {
//                var wrapper = {};
//                wrapper[what.substring(0, what.length -1)] = elem;
//                retElem = wrapper;
//            }
//            return retElem;
//        });
    }
);

function PostsCtrl($scope, Restangular) {

    var postsApi = Restangular.all("posts");

    $scope.allPosts = [];

    $scope.refreshPosts = function() {
        postsApi.getList().then(function(newPostList) {
            $scope.allPosts = newPostList;
        }, function(errorResponse) {
            alert("Error on refreshing posts: " + errorResponse.status);
        });
    }

    $scope.$on('newPost', function() {
         $scope.refreshPosts();
    });

    $scope.$on('deletePost', function(event, postToDelete) {
        $scope.allPosts = _.filter($scope.allPosts, function(nextPost) {
            return nextPost.id != postToDelete.id;
        });
    });

    $scope.refreshPosts();

}

function NewPostCtrl($scope, $rootScope, Restangular) {

    $scope.postContent = "";

    $scope.charsRemaining = function() {
        return 140 - $scope.postContent.length;
    }

    $scope.postInvalidLength = function() {
        return $scope.postContent.length == 0 || $scope.postContent.length > 140
    }

    $scope.newPost = function() {
        var postApi = Restangular.one("posts");
        var newPost = { message: $scope.postContent };
        postApi.post(null, newPost).then(function(response) {
            $rootScope.$broadcast("newPost", newPost);
            $scope.postContent = "";
        }, function(errorResponse) {
            alert("Error on creating post: " + errorResponse.status);
        });
    }
}

function EditPostCtrl($scope, $rootScope, Restangular) {

    $scope.isEditState = false;

    $scope.id=$scope.post._id;

    $scope.activate= function() {
        $scope.isEditState = true;
    }

    $scope.deactivate= function() {
        $scope.isEditState = false;
    }

    $scope.originalContent = $scope.post.message
    $scope.editedContent = $scope.post.message

    $scope.updatePost = function() {

        isEditState = false;
        var actual= Restangular.one('posts', $scope.id);
        $scope.post.message = $scope.editedContent;
        actual.put().then(
            function(response) {
                $scope.isEditState = false;
            }, function(errorResponse) {
                $scope.post.message = $scope.originalContent; // reset back content
                alert("Error saving object:" + errorResponse.status);
            }
        );

    }

    $scope.deletePost = function() {

        isEditState = false;
        var actual= Restangular.one('posts', $scope.id).get();
        $scope.id=actual.id;
        $scope.post.message = $scope.editedContent;

        actual.remove().then(
            function(response) {

               $rootScope.$broadcast("deletePost", actual.id);
            }, function(errorResponse) {

                alert("Error saving object:" + errorResponse.status);
            }
        );

    }
}

