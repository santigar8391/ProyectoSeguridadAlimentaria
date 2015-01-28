/**
 * Created by santiago on 19/01/15.
 */

var inspect = require('util').inspect;
var Client = require('mariasql');

var client = new Client();

exports.connect = function() {
    client.connect
    (
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'H3rm3sSanch3z',
            db: 'proyectoSeguridad'
        }
    );

    client.on
    (
        'connect', function() { console.log('Client connected'); }
    ).on
    (
        'error', function(err) { console.log('Client error: ' + err); }
    ).on
    (
        'close', function(hadError) { console.log('Client closed'); }
    );
}

exports.get_productos = function(cb) {
    var data = [];
    client.query("SELECT id_producto, desc_producto, num_grupo FROM producto INNER JOIN grupo "+
                "ON producto.id_grupo = grupo.id_grupo ORDER BY id_producto;")
        .on('result', function(res) {
            res.on('row', function(row) {
                data.push(row);
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            cb(data);
        });
}

exports.get_grupos = function(cb) {
    var data = [];
    client.query("SELECT id_grupo, num_grupo, desc_grupo FROM grupo;")
        .on('result', function(res) {
            res.on('row', function(row) {
                data.push(row);
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            cb(data);
        });
}

exports.insert_Producto = function(id_grupo, desc_prod) {
    //client.query('INSERT INTO trackpoints (gpsPoint) VALUES (PointFromText(:loc))', { loc: 'POINT(' + lon + " " + lat +  ')' })
    client.query("INSERT INTO producto (id_grupo, desc_producto) VALUES (' "+id_grupo+" ',' "+desc_prod+" ')")
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
}

exports.disconnect = function() {
    client.end();
}