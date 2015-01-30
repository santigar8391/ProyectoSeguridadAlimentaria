var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
//var data = require('./data_producto.js');

var routes = require('./routes/index');
var users = require('./routes/users');
var producto = require('./routes/producto');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



// GESTIÓN DE RUTAS
router.get('/producto', producto.get_listado);
router.get('/producto/nuevo', producto.get_nuevo);
router.get('producto/editar/:id_producto', producto.get_editar);
router.get('/producto/eliminar/:id_producto', producto.eliminar);
router.post('/producto/nuevo', producto.insertar);
router.post('/producto/editar/:id_producto', producto.editar);


/*router.post("/producto", function(req, res) {
 console.log(req.body);
 res.send({ status: 'SUCCESS' });
 });*/


app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;

