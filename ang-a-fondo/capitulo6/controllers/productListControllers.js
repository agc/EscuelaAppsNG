angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")
    .controller("productListCtrl", function ($scope, $filter,productListActiveClass) {
        // $filter es un filtro predefinido de angular. Lo usa en app.html para filtrar
        // por categoría

        var selectedCategory = null;

        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
        }

        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null ||
                product.category == selectedCategory;
        }
        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        }

    });