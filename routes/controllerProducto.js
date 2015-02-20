/**
 * Created by darioh on 03/02/15.
 */

var data_producto = require('../model/data_producto.js');
var data_grupo = require('../model/data_grupo.js');
var express = require('express');
var router = express.Router();

//+++++++++RENDERIZA EL INDEX DEL PRODUCTO+++++++++++++++++++
exports.index = function(req, res, next) {
        res.render('producto/index.jade', {title: "SEGURIDAD ALIMENTARIA"});
}

//+++++++++OBTINE EL LISTADO DEL PRODUCTO++++++++++++++++++
exports.get_listado = function(req, res, next) {
    data_producto.connect();
    data_producto.db_get_listado(function (datos) {
        res.json(datos);
    });
}

//+++++++++OBTIENE EL LISTADO DEL GRUPO++++++++++++++++++++
exports.get_listadoGrupo = function(req, res, next) {
    data_grupo.connect();
    data_grupo.db_get_listado(function (datosg) {
        res.json(datosg);
    });
}

//+++++++++++++++++++INSERTAR UN PRODUCTO++++++++++++++++++++++++
exports.insertarProducto = function(req,res){
    data_producto.connect();
    data_grupo.connect();
    var desc_prod = req.query.desc_producto;
    var id_grupo;
    console.log(req.query.num_grupo);
    data_grupo.db_get_listado(function(datos){
        for (var i in datos) {
            if (datos[i].num_grupo == req.query.num_grupo)
                id_grupo = datos[i].id_grupo;
        }
        console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
        try{
            data_producto.db_insertar(id_grupo, desc_prod,function(bandera){
                if (bandera){
                    res.redirect('producto/index.jade');
                }else{
                    console.log('No sirve el método insertar de producto.js.');
                }
            });
        }catch(e){
            res.redirect('/');
            console.log(e);
            console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
        }
        //console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
    });
}

//++++++++++++++++++++++ELIMINAR UN PRODUCTO.++++++++++++++++++++++++++++++
exports.eliminar = function(req, res){
    data_producto.connect();
    console.log("id de producto: " + req.query._id);
    try{
        data_producto.db_eliminar(req.query._id, function(bandera){
            if (bandera){
                res.redirect('producto/index.jade');
            }else{
                console.log('No sirve el método eliminar de producto.js.');
            }
        });
    }catch (e){
        Console.log('Error: '+ e);
    }

}


//++++++++++++++EDITA UN PRODUCTO++++++++++++++++++++++
exports.editar = function(req, res){
    console.log("LLegue a la duncion EDITAR DE CONTROLLERPRODUCTO");
    data_producto.connect();
    data_grupo.connect();
    var desc_prod = req.query.desc_producto;
    var id_grupo;
    //console.log(req.body.num_grupo);
    data_grupo.db_get_listado(function(datos){
        for (var i in datos) {
            if (datos[i].num_grupo == req.query.num_grupo)
                id_grupo = datos[i].id_grupo;
        }
        //var id_producto = req.query._id;
        console.log("Número de grupo!!!! = "+id_grupo+" , descripcion!!! "+desc_prod +" , id producto!!! "+req.query._id);
        try{
            console.log("DENTRO DEL TRY DE CONTROLLER EN EDITAR");
            data_producto.db_actualizar(id_grupo, desc_prod, req.query._id, function(bandera){
                console.log('Bandera: '+bandera);
                if (bandera){
                    res.redirect('producto/index.jade');
                }else{
                    console.log('No sirve el método insertar de producto.js.');
                }
            });
        }catch(e){
            res.redirect('/');
            console.log(e);
            console.log("DENTRO DEL catch DE CONTROLLER EN EDITAR");
            console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
        }
    });
};
