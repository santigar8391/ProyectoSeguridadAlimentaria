/**
 * Created by darioh on 03/02/15.
 */
//-------------------------------------
var app = angular.module('app', []);
//-------------------------------------
//++++++++++++LISTA LOS PRODUCTOS++++++++++++++++++++++++++++++
app.controller('listaproductos', function($scope, $http) {
    $scope.mostrarProducto = function(){
        $http.get('/producto')
            .success(function (datos) {
                $scope.datoCiclo = datos;
                $scope.mostrarGrupo();
            }).error(function (data) {
                console.log('Error: ' + data);
            });
    }

    $scope.gridOptions = {
        datos: 'datoCiclo'
    };
//++++++++++LISTA GRUPO++++++++++++++++++++++++
    $scope.mostrarGrupo = function(){
        $http.get('/grupo')
            .success(function (datosGrupo){
                $scope.datoCicloGrupo = datosGrupo;
                $scope.nnum_grupo = datosGrupo[0].desc_grupo;
            }).error(function(data){
                console.log('Error: ' + data);
            });
    }

    $scope.num_grupo ='';
    $scope.desc_producto ='';
//++++++++++++++++++ GUARDA UN PRODUCTO+++++++++++++++++++++
    $scope.Save = function(){
    $http({
        method: 'POST',
        url: '/guardar/producto',
        params:
        {
            num_grupo: $scope.nnum_grupo,
            desc_producto: $scope.ndesc_producto
        }
    }).success(function(data) {
        //$scope.mostrarProducto();
    }).error(function() {
        $scope.mostrarProducto();
    });
        $scope.formVisibility=false;
        console.log($scope.formVisibility);
    };
//++++++++++++++++++++++++++++++++++++++++++++++
    $scope.formVisibility=false;

    $scope.hideForm = function(){
        $scope.formVisibility = false;
    }
//++++++++++++++++++++++++++++++++++++++++++++++
    $scope.ShowForm=function(){
        $scope.formVisibility=true;
        //console.log($scope.formVisibility);
        //$scope.nnum_grupo = $scope.datoCicloGrupo[0].desc_grupo;
    }
//++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++ELIMINA UN PRODUCTO+++++++++++++++
    $scope._id='';
    $scope.eliminarProducto = function(id){
        $http({
                method: 'DELETE',
                url: '/eliminar/',// + id,
                params: {
                    _id: id
                }
            }).
                success(function(data) {
                $scope.mostrarProducto();
                }).
                error(function() {
                    $scope.mostrarProducto();
                });
        }


    $scope.editarProducto = function(){
        $http({
            method:'POST',
            url: '/editar/',
            params:{
                _id: $scope.n2id_producto,
                num_grupo:  $scope.n2num_grupo,
                desc_producto: $scope.n2desc_producto
            }
        }).success(function(data){
            $scope.mostrarProducto();
        }).error(function(){
            $scope.mostrarProducto();
        });
        $scope.formVisibility2=false;
    };

    $scope.eProducto = function(id, desc_producto, num_grupo, cb){
        $scope.mostrarProducto();
        $scope.n2id_producto = id,
        $scope.n2desc_producto = desc_producto;
        $scope.n2num_grupo = num_grupo;
        $scope.formVisibility2=true;
        //hideForm();
    }

});