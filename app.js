/**
 * Created by darioh on 26/12/14.
 */
/* INICIALIZANDO VARIABLES PARA OBTENER LOS PAQUETES DE.
EXPRESS Y MARIASQL PARA PODER INGRESAR Y UTILIZAR TODAS.
SUS FUNCIONES.*/

var express = require('express');
var maria = require('mariasql');
var app = express();

/*Linea de codigo que une el path actual desde donde sirve
ANTES ERA... app.use("/public", express.static('/public'));
node con express y le une "/public" */
//app.use('/public', express.static('public'));
app.use('/public', express.static(__dirname + '/public'));

//-------------------------------------------------------------
//Ni bien llega a lo que es la raiz que es el dominio de nuestro navegador
//envie un response.
app.get('/', function(req, res){

    res.sendfile("index.html");
});

//Creo un servidor y lo pongo a escuchar por el puerto 7000
app.listen(7000, function(){
    console.log("Servidor iniciado en el puerto 7000");
});
//-------------------------------------------
var inspect = require('util').inspect;
var Client = require('mariasql');

var c = new Client();
c.connect({
    host: '127.0.0.1',
    user: 'root',
    password: 'H3rm3sSanch3z'
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

//-----------------------------------------------
c.query('SHOW DATABASES')
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
c.end();