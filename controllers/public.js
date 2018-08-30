const mongoose = require('mongoose')
const generator = require('mongoose-gen')
const Schema = mongoose.Schema

const chalk = require('chalk')

const config = require('../config')
const Proyecto = require('../models/proyecto')


function listarColeccion(req, res) {

	let proyectoId = req.params.idProyecto
	let coleccionName = req.params.nameColeccion

	Proyecto.findOne({ id: proyectoId, 'collections.name': coleccionName }, (err, proyecto) => {
		if (err) return res.status(500).send({ message: `ERROR al realizar la consulta: ${err}` })
		if (!proyecto) return res.status(400).send({ message: `ERROR: No existe el proyecto o la coleccion` })
		let bbddColeccion = new mongoose.Mongoose()

		// Abro una nueva bbdd con el nombre del proyecto
		bbddColeccion.connect(config.db + "/" + proyectoId, {useNewUrlParser: true})
			.then(() => {
				console.log(chalk.yellow('----> Conectado a: ' + bbddColeccion.connection.name) )

				// Selecciono el modelo de la colección a usar
				let coleccion = proyecto.collections.find(function (e) { return e.name == coleccionName })
				let modelo = JSON.parse(coleccion.model)

				// Creo un esquema tomando el modelo de la colección
				const dinamicSchema = new Schema(generator.convert(modelo), { collection: coleccion.name })
				// Creo un modelo tomando el esquema de la colección
				const ColeccionDinamica = bbddColeccion.model('ColeccionDinamica', dinamicSchema);

				// Guardo los datos recibidos en la request en la colección
				ColeccionDinamica.find({}, (err, respuesta) => {
					if (err) return res.status(500).send({ message: `Error realizar consulta: ${err}` })

					// Elimino el modelo de la conexión
					delete bbddColeccion.connection.models['ColeccionDinamica'];
					
					// Cierro la conexión a la bbdd
					// bbdd.connection.close()
					bbddColeccion.disconnect()
					console.log(chalk.yellow('----> Desconectado de: ' + bbddColeccion.connection.name) )

					res.status(200).send({ data: respuesta })
				})			
			})
			.catch((err) => {
				console.log(err)
			})

	})
}


module.exports = {
	listarColeccion
}