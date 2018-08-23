const mongoose = require('mongoose')
const generate = require('nanoid/generate')
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'

const Proyecto = require('../models/proyecto')
const Coleccion = require('../models/coleccion')

function crearColeccion(req, res) {
	const coleccion = req.body

	const nuevaColeccion = new Coleccion() 

	Proyecto.findOne({ id: coleccion.projectId }, (err, proyecto) => {

		if (err) return res.status(500).send({ message: `ERROR al consultar colecciones del proyecto: ${err}` })
		if (!proyecto) return res.status(400).send({ message: `ERROR el proyecto no existe` })

		// Comprobar que el proyecto no tiene una colección con el mismo nombre
		if (proyecto.collections.some( e => e.name === coleccion.name)) {
			return res.status(400).send({ message: `ERROR ya existe una colección con ese nombre en el proyecto` })
		}

		// Abrir un nuevo documento de colección y setearlo
		// let nuevaColeccion = new Coleccion()

		nuevaColeccion.name = coleccion.name
		nuevaColeccion.model = coleccion.model
		nuevaColeccion.id = generate(alphabet, 10)
		nuevaColeccion.projectId = coleccion.projectId

		// Guardar la colección
		nuevaColeccion.save((err, coleccionGuardada) => {
			if (err) return res.status(500).send({ message: `Error al guardar colección: ${err}` })
		})

		// Asociar la colección al proyecto
		// proyecto.collections.push({ id: nuevaColeccion.id, name: nuevaColeccion.name })

		let query   = { id: coleccion.projectId }
		let update  = { $push: { collections: { id: nuevaColeccion.id, name: nuevaColeccion.name } } }
		let options = { new: true }

		Proyecto.updateOne(query, update, options, (err, resp) => {
			if (err) return res.status(500).send({ message: `Error al actualizar proyecto: ${err}` })

			console.log('_______________' + JSON.stringify(resp) )
			return res.status(200).send('Se ha creado la coleccion')
		})

	})

}

function listarColecciones(req, res) {

}

module.exports = {
	crearColeccion,
	listarColecciones
}