var express = require('express');
var router = express.Router();

/*
// route middleware that will happen on every request
router.use(function(req, res, next) {

  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next();
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get página encuestas.
router.get('/surveys', function(req, res, next){
  res.render('surveys/index',{ title: 'Encuestas'})
});

// get página nueva encuesta
router.get('/surveys/new', function(req, res, next){
  var data = require('../data.js');

  data.connect();
  var datos = data.getProductos();
  console.log("Datos de la Base de Datos" + datos);
  res.render('surveys/new', { title: 'Nuevo', lista: datos});
});
module.exports = router;
