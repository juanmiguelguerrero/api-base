const express = require('express')
const router = express.Router()

const publicCtrl = require('../controllers/public')

// Listar elementos de una colección
router.get('/:idProyecto([a-z0-9]{10})/:nameColeccion', publicCtrl.listarColeccion)

// Crear nuevo registro en una colección
router.post('/', publicCtrl.crearRegistro)

module.exports = router



