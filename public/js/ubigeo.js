var app = angular.module('app', []);

app.controller('UbiGeoCtrl', function($scope, $http){
   //$scope.mensaje ="Mundo desde un controlador!!!";
    $http.get('/public/data/departamento.json')
        .success(function(departamento){
            $scope.departamentoCiclo=departamento;
            $scope.modelDepartamento = departamento[0].codigoDepartamento;
            $scope.cargarProvincia();
        });

    $scope.cargarProvincia = function(){
        $http.get('/public/data/provincia.json')
            .success(function(provincia){
                /* -------------------------------------
                $scope.provincia = provincia;
                $scope.modelProvincia = provincia[0].codigoProvincia;
                $scope.cargarDistrito();
                --------------------------------------------
                */

                provincia = provincia.filter(function(item){
                    return(item.codigoDepartamento == $scope.modelDepartamento);
                });
                $scope.provinciaCiclo = provincia;
                $scope.modelProvincia = provincia[0].codigoProvincia;
                $scope.cargarDistrito();
            });
    }

    $scope.cargarDistrito = function() {
        $http.get('/public/data/distrito.json')
            .success(function(distrito){
                /* --------------------------------------
                $scope.distrito=distrito;
                $scope.modelDistrito = distrito[0].codigoDistrito;
                ----------------------------------------------
                */
                distrito = distrito.filter(function(item){
                    return(item.codigoProvincia == $scope.modelProvincia);
                });
                    $scope.distritoCiclo = distrito;
                    $scope.modelDistrito = distrito[0].codigoDistrito;
            });
    }

});


//------MIO------------------------------------
/*
app.controller('UbiGeoCtrl', function($scope, $http){
    //$scope.mensaje ="Mundo desde un controlador!!!";
    $http.get('/public/data/departamento.json')
        .success(function(departamento){
            $scope.departamento=departamento;
            $scope.modelDepartamento = departamento[0].codigoDepartamento;

        });

    $http.get('/public/data/provincia.json')
        .success(function(provincia){
            $scope.provincia = provincia;
            $scope.modelProvincia = provincia[0].codigoProvincia;
        });

    $http.get('/public/data/distrito.json')
        .success(function(distrito){
            $scope.distrito=distrito;
            $scope.modelDistrito = distrito[0].codigoDistrito;
        });
});*/