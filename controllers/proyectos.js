const mongoose = require('mongoose')
const generate = require('nanoid/generate')
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'

const Proyecto = require('../models/proyecto')

function crearProyecto(req, res) {

	let proyecto = new Proyecto()

	proyecto.name = req.body.name
	proyecto.id = generate(alphabet, 10)

	proyecto.save((err, proyectoGuardado) => {
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