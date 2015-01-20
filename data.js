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

exports.getlistaproductos = function(){
    var producto = {};
    client.query('SELECT idproducto, descproducto FROM producto')
        .on('result', function(res) {
            res.on('row', function(row) {
                producto.push({idprod: row['idproducto'], descprod: row['descproducto']});
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            return producto;
        });
}



/*
exports.insertPoint = function(lon, lat) {
// console.log('INSERT INTO trackpoints (gpsPoint) VALUES (PointFromText(:loc))', { loc: 'POINT(' + lon + " " + lat +  ')' });

    client.query('INSERT INTO trackpoints (gpsPoint) VALUES (PointFromText(:loc))', { loc: 'POINT(' + lon + " " + lat +  ')' })
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

exports.getTrackPoints = function(trackId, httpRes) {
    var xys = [];

    client.query('SELECT X(GeomFromText(AsText(gpsPoint))) AS X, Y(GeomFromText(AsText(gpsPoint))) AS Y FROM trackpoints WHERE trackId = :pTrackId', { pTrackId: trackId })
        .on('result', function(res) {

            res.on('row', function(row) {
                xys.push(row);
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            httpRes.send(xys);
        });
}

exports.getXMLTracks = function(httpRes) {
    var data = { tracks: {} };

    client.query('SELECT filename, lon, lat FROM GPXSource ORDER BY time')
        .on('result', function(res) {
            res.on('row', function(row) {
                if (data.tracks[row['filename']] == undefined)
                    data.tracks[row['filename']] = [];

                data.tracks[row['filename']].push({ lon: row['lon'], lat: row['lat'] });
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            httpRes.json(data);
        });
}

exports.getXMLTracksDuration = function(httpRes) {
    var data = [];

    client.query('SELECT filename, TIMEDIFF(MAX(time), MIN(time)) AS duration  FROM GPXSource GROUP BY filename ORDER BY filename;')
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
            httpRes.json(data);
        });
}

exports.getDistance = function(trackId, httpRes) {
    var result = [];

    client.query("SELECT SUM(earth_circle_distance(t1.gpsPoint, t2.gpsPoint)) AS distance \
FROM trackpoints t1 INNER JOIN trackpoints t2 ON t2.pointId = (t1.pointId + 1) WHERE t1.tr\
ackId = :pTrackId", { pTrackId: trackId })
        .on('result', function(res) {
            console.log("Result: " + inspect(result));
            res.on('row', function(row) {
                result.push(row);
                console.log("Result row: " + inspect(row));
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            httpRes.send(result);
        });
}
*/

exports.disconnect = function() {
    client.end();
}