/**
 * Created by darioh on 03/02/15.
 */

var data_producto = require('../model/data_producto.js');
var data_grupo = require('../model/data_grupo.js');
var express = require('express');
var router = express.Router();

exports.index = function(req, res, next) {
        res.render('producto/index.jade', {title: "SEGURIDAD ALIMENTARIA"});
}

exports.get_listado = function(req, res, next) {
    data_producto.connect();
    data_producto.db_get_listado(function (datos) {
        res.json(datos);
    });
}

exports.get_listadoGrupo = function(req, res, next) {
    data_grupo.connect();
    data_grupo.db_get_listado(function (datosg) {
        res.json(datosg);
    });
}

//---------------------------------------------------------------------------
// inserta un nuevo producto en la tabla "producto"
exports.insertarProducto = function(req,res){
    data_producto.connect();
    data_grupo.connect();
    //var num_grup = req.body.num_grupo;
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

//---------------------------------------------------------------------------




// obtiene página producto
/*module.exports = exports = {

    index: function(req, res){
      res.render('./producto/index');
        console.log('En el index de /producto/');
    },

    listadoProducto: function(req, res){
        res.render("este es texto desde listadoProducto");
        /*data_producto.connect();
        data_producto.db_get_listado(function(datoCiclo){
            console.log(datoCiclo);
            console.log('desde getlistado!!!');
            //res.json(datoCiclo);
            res.render(datoCiclo);
    });
    }
};*/

