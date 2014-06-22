angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:5500/products")
    .controller("sportsStoreCtrl", function ($scope,$http,dataUrl) {
        $scope.data={}
        $http.get(dataUrl)
            .success(function (data) {
                 $scope.data.products = data; //Angularjs convierte automáticamente json a javascript
                // prueba de error
                 //$scope.data.error={status:"Error al cargar los datos",mensaje:"Ha habido un error"}
                // tambion cambiar dataUrl a una que no existe, por ejemplo cambio el puerto
            })
            .error(function (error) {
                $scope.data.error = error;
            });
        /* sustituye a
        $scope.data = {
            products: [
                { name: "Product #1", description: "A product",
                    category: "Category #1", price: 100 },
                { name: "Product #2", description: "A product",
                    category: "Category #1", price: 110 },
                { name: "Product #3", description: "A product",
                    category: "Category #2", price: 210 },
                { name: "Product #4", description: "A product",
                    category: "Category #3", price: 202 }]

 }; */
    });
