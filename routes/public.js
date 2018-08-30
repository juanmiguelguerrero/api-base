const express = require('express')
const router = express.Router()

const publicCtrl = require('../controllers/public')

// Listar elementos de una colección
router.get('/:idProyecto([a-z0-9]{10})/:nameColeccion', publicCtrl.listarColeccion)


module.exports = router



