const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Mongoose = require('mongoose').Mongoose
const ddbb = new Mongoose()

const Proyecto = require('../models/proyecto')
const Coleccion = require('../models/coleccion')
const ModeloDinamico = require('../models/dinamico')


function listarColeccion(req, res) {

	const idProyecto = req.params.idProyecto
	const nameColeccion = req.params.nameColeccion

	Proyecto.findOne({ id: idProyecto }, (err, proyecto) => {
		if (err) return res.status(500).send({ message: `ERROR al realizar la consulta: ${err}` })
		if (!proyecto) return res.status(400).send({ message: `ERROR: No existe el proyecto` })
		
		// Comprobar que el proyecto tiene una colección con el nombre recibido
		if (!proyecto.collections.some( e => e.name === nameColeccion)) {
			return res.status(200).send('ERROR: No existe la colección')
		}

		Coleccion.findOne({ projectId: idProyecto, name: nameColeccion }, (err, coleccion) => {
			if (err) return res.status(500).send({ message: `ERROR al realizar la consulta: ${err}` })
			if (!coleccion) return res.status(500).send({ message: `ERROR: No existe la coleccion buscada` })

			let dinamicSchema = new Schema(coleccion.model, { collection: coleccion.name })
			
			ddbb.connect('mongodb://localhost:27017/' + coleccion.projectId, (err, resolve) => {
				if (err) return res.status(500).send({ message: `ERROR al realizar conexion ddbb: ${err}` })

				const ColeccionDinamica = ddbb.model('ColeccionDinamica', dinamicSchema);

				ColeccionDinamica.find({}, (err, coleccionDinamica) => {
					delete ddbb.connection.models['ColeccionDinamica'];
					return res.status(200).send(coleccionDinamica)
				})
			})
		})
	})
}


function crearRegistro(req, res) {

	// ddbb.connect('mongodb://localhost:27017/' + coleccion.projectId, (err, resolve) => {
	// 	if (err) return res.status(500).send({ message: `ERROR al realizar conexion ddbb: ${err}` })
		
	// 	console.log('Conexión a la base de datos realizada...')

	// 	const ColeccionDinamica = ddbb.model('ColeccionDinamica', dinamicSchema);
	// 	let coleccionDinamica = new ColeccionDinamica
	// 	coleccionDinamica['title 2'] = "Prueba 30"
	// 	coleccionDinamica['number 2'] = 197234
		
	// 	coleccionDinamica.save((err, din) => {
	// 		if (err) return res.status(500).send({ message: `Error al guardar coleccion: ${err}` })
	// 		res.status(200).send({ coleccion: din })
	// 	})
	// })

	res.status(200).send('Creo un registro')
}

module.exports = {
	listarColeccion,
	crearRegistro
}