/**
 * Created by santiago on 19/01/15.
 */
var data = require('../data.js');

// get página producto
exports.get_lista_producto = function(req, res, next){
    data.connect();
    data.get_productos(function(datos){
        //res.json(datos);
        res.render('producto/index', { title: 'Producto', lista: datos});
    });
    data.disconnect();
}

// get nuevo producto
exports.set_nuevo_producto = function(req, res) {
    res.render('producto/nuevo.jade', { title: 'Nuevo Producto'});
}

exports.insert_nuevo_producto = function(req,res){
    data.connect();
    var num_grup = req.body.num_grupo;
    var desc_prod = req.body.desc_producto;
    var algo = [];
    data.get_grupos(function(datos){
        for (var dato in datos) {
            algo.push(dato);
        }
        console.log("Dato: "+ algo);
    });
    console.log("Número de grupo = "+num_grup+" , descripcion "+desc_prod);
    res.end("yes");
}




