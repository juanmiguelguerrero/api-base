const express = require('express')
const router = express.Router()

// Formulario alta nuevo proyecto
router.get ('/', function (req, res, next) {

	res.render ('home');
});

router.get ('/proyecto', (req,res,next) => {

	res.render ('proyecto');
});

router.get ('/coleccion', (req,res,next) => {

	res.render ('coleccion');
});

router.get ('/cargardatos', (req,res,next) => {

	res.render ('cargardatos');
});

module.exports = router



