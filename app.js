/**
 * Created by darioh on 26/12/14.
 */
/* INICIALIZANDO VARIABLES PARA OBTENER LOS PAQUETES DE.
EXPRESS Y MARIASQL PARA PODER INGRESAR Y UTILIZAR TODAS.
SUS FUNCIONES.*/

var express = require('express');
var maria = require('mariasql');
var app = express();

//Router.use(app);
/*
* Voy a usar Jade como motor de generador de vistas... para esto
* indico a express que mi motor de generador de vistas es JADE
* AHORA, express siempre buscara el directorio "views" encotrar las vistas
* y renderizarlo... ENTONCES...
* */


//app.use('view engine', 'jade');


 //la siguiente linea esta por defecto para express pero lo pongo para no perderme...
//quiere decir que le da al directorio __dirname la direccion de "views" pa que pueda encontrar y ejecutar el archivo
//que este en el directorio...



//app.use('views', __dirname + '/views');

/*Linea de codigo que une el path actual desde donde sirve
ANTES ERA... app.use("/public", express.static('/public'));
node con express y le une "/public" */
//app.use('/public', express.static('public'));



app.use('public', express.static(__dirname + '/public'));



//-------------------------------------------------------------
//Ni bien llega a lo que es la raiz que es el dominio de nuestro navegador
//envie un response enviando un index.html.

//-------*****
        app.get('/', function(req, res){
            res.sendfile("index.html");
        });
//-------*****

//ahora enviamos un index.jade pero con render porque es JADE
/*app.get('/', function(req, res){
    res.render("index,jade");

});*/

//Creo un servidor y lo pongo a escuchar por el puerto 7000
app.listen(7000, function(){
    console.log("Servidor iniciado en el puerto 7000");
});





//------CREANDO EL CLIENTE Y ACCEDIENDO A LA BASE DE DATOS MARIADB-------------------------------------
var inspect = require('util').inspect;
var Client = require('mariasql');

var c = new Client();
c.connect({
    host: '127.0.0.1',
    user: 'root',
    password: 'H3rm3sSanch3z',
    db: 'proyectoSeguridad'
});

c.on('connect', function() {
    console.log('Client connected');
})
    .on('error', function(err) {
        console.log('Client error: ' + err);
    })
    .on('close', function(hadError) {
        console.log('Client closed');
    });

c.query('SELECT * FROM producto WHERE idproducto = :idproducto AND descproducto = :name',
    { idproducto: 1, name: 'banana' })
    .on('result', function(res) {
        res.on('row', function(row) {
            console.log('Result row: ' + inspect(row));
        })
            .on('error', function(err) {
                console.log('Result error: ' + inspect(err));
            })
            .on('end', function(info) {
                console.log('Result finished successfully');
            });
    })
    .on('end', function() {
        console.log('Done with all results');
    });

/*c.query('SELECT * FROM producto WHERE idproducto = ? AND descproducto = ?',
    [ 1, 'banana' ])
    .on('result', function(res) {
        res.on('row', function(row) {
            console.log('Result row: ' + inspect(row));
        })
            .on('error', function(err) {
                console.log('Result error: ' + inspect(err));
            })
            .on('end', function(info) {
                console.log('Result finished successfully');
            });
    })
    .on('end', function() {
        console.log('Done with all results');
    });*/

c.end();

//-----------------------------------------------
/*c.query('SHOW DATABASES')
    .on('result', function(res) {
        res.on('row', function(row) {
            console.log('Result row: ' + inspect(row));
        })
            .on('error', function(err) {
                console.log('Result error: ' + inspect(err));
            })
            .on('end', function(info) {
                console.log('Result finished successfully');
            });
    })
    .on('end', function() {
        console.log('Done with all results');
    });
c.end();*/
