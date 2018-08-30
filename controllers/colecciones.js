const mongoose = require('mongoose')
const Schema = mongoose.Schema
const generate = require('nanoid/generate')
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const chalk = require('chalk')

const config = require('../config')
const Proyecto = require('../models/proyecto')

function crearColeccion(req, res) {
	
	let nuevaColeccion = req.body

	Proyecto.findOne({ id: nuevaColeccion.projectId }, (err, proyecto) => {

		if (err) return res.status(500).send({ message: `ERROR al consultar colecciones del proyecto: ${err}` })
		if (!proyecto) return res.status(400).send({ message: `ERROR el proyecto no existe` })

		// Comprobar que el proyecto no tiene una colección con el mismo nombre
		if (proyecto.collections.some( e => e.name === nuevaColeccion.name)) {
			return res.status(400).send({ message: `ERROR ya existe una colección con ese nombre en el proyecto` })
		}

		let coleccion = {
			id: generate(alphabet, 10),
			name: nuevaColeccion.name,
			projectId: nuevaColeccion.projectId,
			model: nuevaColeccion.model
		}

		console.log(coleccion)

		let query   = { id: nuevaColeccion.projectId }
		let update  = { $push: { collections: coleccion } }
		let options = { new: true } //Devuelve como resp el nuevo documento actualizado

		Proyecto.updateOne(query, update, options, (err, resp) => {
			if (err) return res.status(500).send({ message: `Error al actualizar proyecto: ${err}` })

			console.log('_______________' + JSON.stringify(resp) )
			return res.status(200).send({ message: `Se ha creado la colección` })
		})
	})

}

function listarColecciones(req, res) {

	Proyecto.find({id: req.params.idProyecto }, (err, proyecto) => {
		if (err) return res.status(500).send({ message: `Error al listar coleccion: ${err}` })
		if (!proyecto) return res.status(400).send({ message: `ERROR el proyecto no existe` })

		res.status(200).send({ collections: proyecto[0].collections })
	})

}

function cargarDatos(req, res) {

	let proyectoId = req.body.proyectoId
	let coleccionId = req.body.coleccionId
	let payload = req.body.payload

	Proyecto.findOne({ id: proyectoId, 'collections.id': coleccionId }, (err, proyecto) => {
		if (err) return res.status(500).send({ message: `Error al cargar datos en coleccion: ${err}` })
		if (!proyecto) return res.status(400).send({ message: `ERROR no existe el proyecto o colección` })

		let bbddColeccion = new mongoose.Mongoose()

		bbddColeccion.connect(config.db + "/" + coleccionId, {useNewUrlParser: true})
			.then(() => {
				console.log(chalk.yellow('----> Conectado a: ' + bbddColeccion.connection.name) )


				// Selecciono el modelo de la colección a usar
				let coleccion = proyecto.collections.find(function (e) { return e.id == coleccionId })
				let modelo = coleccion.model
				// let modelo = JSON.parse(coleccion.model)

				console.log('Modelo: ' + modelo)

				// Mapeo el modelo cargado para hacerlo compatible con el Schema de Mongoose
				// const map = {
				// 	// String: mongoose.Types.String,
				// 	// Number: mongoose.Types.Number
				// 	String: String,
				// 	Number: Number
				// } 

				// for (let m in modelo) {
				// 	modelo[m] = map[modelo[m]];
				// 	console.log(m + " --- " + map[modelo[m]])
				// }

				// console.log(JSON.parse(modelo))
				// console.log(JSON.stringify(modelo))

				
				
				const dinamicSchema = new Schema(modelo, { collection: coleccion.name })
				const ColeccionDinamica = bbddColeccion.model('ColeccionDinamica', dinamicSchema);

				// ColeccionDinamica.find({}, (err, coleccionDinamica) => {
				// 	delete bbddColeccion.connection.models['ColeccionDinamica'];
				// 	// bbdd.connection.close()
					// bbddColeccion.disconnect()
				// 	console.log(chalk.yellow('----> Desconectado de: ' + bbddColeccion.connection.name) )
				// 	return res.status(200).send(coleccionDinamica)
				// })				
			})
			.catch((err) => {
				console.log(err)
			})
	})

	
}

module.exports = {
	crearColeccion,
	listarColecciones, 
	cargarDatos
}