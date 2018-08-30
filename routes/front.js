const express = require('express')
const router = express.Router()

// Página principal
router.get ('/', function (req, res, next) {

	res.render ('home');
});

// Formulario alta nuevo proyecto
router.get ('/proyecto', (req,res,next) => {

	res.render ('proyecto');
});

// Formulario alta nueva colección
router.get ('/coleccion', (req,res,next) => {

	res.render ('coleccion');
});

// Formulario carga datos en una colección
router.get ('/cargardatos', (req,res,next) => {

	res.render ('cargardatos');
});

module.exports = router



