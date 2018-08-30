const express = require('express')
const router = express.Router()

const proyectosCtrl = require('../controllers/proyectos')
const coleccionesCtrl = require('../controllers/colecciones')


// Funcionalidades de la API Privada
// 
// [ ] Login y autenticación
// [ ] Actualizar datos del perfil de usuario
// [ ] Crear un nuevo proyecto
// [ ] Editar información básica de un proyecto
// [ ] Listar las colecciones de un proyecto
// [ ] Crear una nueva colección
// [ ] Editar la información y modelo de una colección
// [ ] Crear un nuevo usuario en el proyecto
// [ ] Listar los usuarios de un proyecto
// [ ] Editar permisos de un usuario
// [ ] Crear una nueva API KEY para un proyecto
// [ ] Editar permisos de una API KEY para un proyecto
// [ ] Log del proyecto para una fecha determinada

// Crear un proyecto
router.post('/proyecto', proyectosCtrl.crearProyecto)

// Crear una coleccion
router.post('/coleccion', coleccionesCtrl.crearColeccion)

// Listar mis proyectos
router.get('/proyectos', proyectosCtrl.listarProyectos)

// Listar las colecciones de un proyecto
router.get('/colecciones/:idProyecto', coleccionesCtrl.listarColecciones)

// Cargar datos en una colección
router.post('/cargardatos/', coleccionesCtrl.cargarDatos)


module.exports = router



