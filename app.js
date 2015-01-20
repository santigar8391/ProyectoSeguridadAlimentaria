var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var data = require('./data.js');

var routes = require('./routes/index');
var users = require('./routes/users');
//var common = require('./routes/common');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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

// parte de desarrollo

/*
var subApp = express();
subApp.get('/surveys', function (req, res, next) {
    next();
    console.log('Hola');
})
app.use(subApp);
*/
app.get('/surveys', function (req, res) {
    console.log('Chucha madre no sale!!!');
    res.end();
});
/*

app.get('/surveys', function (req, res, next){
    console.log(listado_productos());
    res.send('/')
});

listado_productos = function(){
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
*/
module.exports = app;

