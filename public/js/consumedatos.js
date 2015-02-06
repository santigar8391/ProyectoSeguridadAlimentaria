/**
 * Created by darioh on 03/02/15.
 */
//-------------------------------------
var app = angular.module('app', []);
//-------------------------------------

app.controller('listaproductos', function($scope, $http) {

    $scope.mostrarProducto = function(){

        $http.get('/producto')
            .success(function (datos) {
                console.log(datos);
                $scope.datoCiclo = datos;
                $scope.mostrarGrupo();
            }).error(function (data) {
                console.log('Error: ' + data);
            });

    }


    $scope.mensaje = " Haciendo pruebas desde consume datos -> variable mensaje ";

    $scope.mostrarGrupo = function(){
        $http.get('/grupo')
            .success(function (datosGrupo){
                console.log(datosGrupo);
                $scope.datoCicloGrupo = datosGrupo;
            }).error(function(data){
                console.log('Error: ' + data);
            });
    }
    $scope.num_grupo ='';
    $scope.desc_producto ='';

    $scope.Save= function(){
    $http({
        method: 'POST',
        url: '/guardar/producto',
        params:
        {
            num_grupo: $scope.nnum_grupo,
            desc_producto: $scope.ndesc_producto
        }
    }).success(function(data) {
        /*if(typeof(data) == 'object'){
            $scope.limpiarDatos();
            $scope.cargarClientes();
        }else{
            alert('Error al intentar guardar el cliente.');
        }*/
        $scope.mostrarProducto();
    }).error(function() {
        $scope.mostrarProducto();
        //alert('Error al intentar guardar producto.');
    });
        $scope.formVisibility=false;
        console.log($scope.formVisibility);
    };

    $scope.formVisibility=false;
    $scope.ShowForm=function(){
        $scope.formVisibility=true;
        console.log($scope.formVisibility);
    }

});