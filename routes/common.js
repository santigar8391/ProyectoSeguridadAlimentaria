/**
 * Created by santiago on 19/01/15.
 */
var data = require('../data.js');

// get página encuestas.
exports.get_lista_encuesta = function(req, res, next){
    res.render('surveys/index',{ title: 'Encuestas'})
}

// get nueva encuesta
exports.get_nueva_encuesta = function(req, res) {
    data.connect();
    data.getProductos(function(datos){
        //res.json(datos);
        res.render('surveys/new', { title: 'Lista de datos desde index.js de router', lista: datos});
    });
}







/*
app.get('/tasks', function(req, res){
    Task.find({}, function (err, docs) {
        res.render('tasks/index', {
            title: 'Tasks index view',
            docs: docs
        });
    });
});
*/

/*
var fs = require('fs');
var xml2js = require('xml2js');

var testFilePath = '/home/rasmus/nodegpxmariadb/public/uploads/3987-dh6yc5.gpx';

exports.fileForm = function(req, res) {
    res.render('upload', {
        title: 'Upload File'
    });
};

exports.fileUpload = function(req, res, next){
    console.log('file info: ',req.files.uploadedFile);

    //split the url into an array and then get the last chunk and render it out in the send req.
    // var pathArray = req.files.uploadedFile.path.split( '/' );
    req.session.uploadedFilePath = req.files.uploadedFile.path;

    res.send(util.format(' Task Complete \n uploaded %s (%d Kb) to %s as %s'
        , req.files.uploadedFile.name
        , req.files.uploadedFile.size / 1024 | 0
        , req.session.uploadedFilePath
        , req.body.title
        , req.files.uploadedFile
    ));


};

exports.readFile = function(req, res) {
    fs.readFile(testFilePath, 'ascii', function (err, data) {
        if (err) {
            res.send(err);
        };
        res.send(data);
    });
};

exports.parseGPX = function(req, res) {
    var data = require('../data.js');
    var json = '';

    try {
        var fileData = fs.readFileSync(req.session.uploadedFilePath, 'ascii');
        var parser = new xml2js.Parser();
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = result;
        });

        var debug = '';
        var lon = null;
        var lat = null;

        data.connect();

        for(var i in json.gpx.trk[0].trkseg[0].trkpt) {
            lon = json.gpx.trk[0].trkseg[0].trkpt[i].$.lon;
            lat = json.gpx.trk[0].trkseg[0].trkpt[i].$.lat;
            data.insertPoint(lon, lat);

            debug += "lon: " + lon + " - ";
            debug += "lat: " + lat + "\n";
        }

        data.disconnect();

        res.send(debug);
    } catch (ex) {
        res.send(ex);
    };
};

exports.mariadb = function(req, res) {
    var data = require('../data.js');

    data.connect();
    data.disconnect();

    res.send("Connected and disconnected from MariaDB!");
};

exports.listPoints = function(req, res) {
    var data = require('../data.js');

    data.connect();
    data.getTrackPoints(1, res);
}

exports.xmlTracks = function(req, res) {
    var data = require('../data.js');

    data.connect();
    data.getXMLTracks(res);
}

exports.xmlTracksDuration = function(req, res) {
    var data = require('../data.js');

    data.connect();
    data.getXMLTracksDuration(res);
}

exports.trackInfo = function(req, res) {
    var data = require('../data.js');

    data.connect();
    console.log("trackId: " + req.param("trackId"));
    data.getDistance(req.param("trackId"), res);
}
*/
