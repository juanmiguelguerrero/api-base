const mongoose = require('mongoose')
const generate = require('nanoid/generate')
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'

const Proyecto = require('../models/proyecto')

function crearProyecto(req, res) {

	let nuevoProyecto = {
		name: req.body.name,
		id: generate(alphabet, 10)
	}

	Proyecto.create( nuevoProyecto, (err, proyectoGuardado) => {
		if (err) return res.status(500).send({ message: `Error al guardar proyecto: ${err}` })

		res.status(200).send({ project: proyectoGuardado })
	})

}

function listarProyectos(req, res) {

	Proyecto.find({}, (err, listaProyectos) => {
		if (err) return res.status(500).send({ message: `Error al listar proyectos: ${err}` })

		res.status(200).send({ projects: listaProyectos })
	})

}



module.exports = {
	crearProyecto,
	listarProyectos
}