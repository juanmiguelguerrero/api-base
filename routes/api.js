const express = require('express')
const router = express.Router()

const proyectosCtrl = require('../controllers/proyectos')
const coleccionesCtrl = require('../controllers/colecciones')

// Listar mis proyectos
router.get('/proyectos', proyectosCtrl.listarProyectos)

// Crear un proyecto
router.post('/proyecto', proyectosCtrl.crearProyecto)

// Crear una coleccion
router.post('/coleccion/:idProyecto', coleccionesCtrl.crearColeccion)

// Listar las colecciones de un proyecto
router.get('/colecciones/:idProyecto', coleccionesCtrl.listarColecciones)


module.exports = router



