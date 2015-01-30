var data_producto = require('../model/data_producto.js');
var data_grupo = require('../model/data_grupo.js');

// obtiene página producto
exports.get_listado = function(req, res, next){
    data_producto.connect();
    data_producto.db_get_listado(function(datos){
        //res.json(datos);
        res.render('producto/index', { title: 'Producto', lista: datos});
    });
    //data.disconnect();
}

// obtiene página nuevo producto
exports.get_nuevo = function(req, res) {
    data_grupo.connect();
    data_grupo.db_get_listado(function(datos){
        res.render('producto/nuevo.jade', { title: 'Nuevo Producto', lista: datos});
    });
}

// obtiene página editar producto
exports.get_editar = function(req, res){

};

// elimina un producto de la tabla "producto"
exports.eliminar = function(req, res){
    data_producto.connect();
    console.log("id de producto: " + req.params.id_producto);
    data_producto.db_eliminar(req.params.id_producto, function(bandera){
        if (bandera){
            res.redirect('/producto');
        }else{
            console.log('No sirve el método eliminar de producto.js.');
        }
    });
}

// inserta un nuevo producto en la tabla "producto"
exports.insertar = function(req,res){
    data_producto.connect();
    data_grupo.connect();
    //var num_grup = req.body.num_grupo;
    var desc_prod = req.body.desc_producto;
    var id_grupo;
    console.log(req.body.num_grupo);
    data_grupo.db_get_listado(function(datos){
        for (var i in datos) {
            if (datos[i].num_grupo == req.body.num_grupo)
                id_grupo = datos[i].id_grupo;
        }
    console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
    try{
        data_producto.db_insertar(id_grupo, desc_prod,function(bandera){
            if (bandera){
                res.redirect('/producto');
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

// edita un producto de la tabla "producto"
exports.editar = function(req, res){

};