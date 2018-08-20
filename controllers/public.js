const mongoose = require('mongoose')
const Schema = mongoose.Schema
const chalk = require('chalk')

const Proyecto = require('../models/proyecto')
const Coleccion = require('../models/coleccion')
// const ModeloDinamico = require('../models/dinamico')

async function conectarBBDD() {}

function listarColeccion(req, res) {

	Coleccion.findOne({ projectId: req.params.idProyecto, name: req.params.nameColeccion }, (err, coleccion) => {
		if (err) return res.status(500).send({ message: `ERROR al realizar la consulta: ${err}` })
		if (!coleccion) return res.status(400).send({ message: `ERROR: No existe el proyecto o la coleccion` })

		let bbdd = new mongoose.Mongoose()

		bbdd.connect('mongodb://localhost:27017/' + coleccion.projectId, {useNewUrlParser: true})
			.then(() => {
				console.log(chalk.green('----> Conectado a: ' + bbdd.connection.name) )
				
				const dinamicSchema = new Schema(coleccion.model, { collection: coleccion.name })
				const ColeccionDinamica = bbdd.model('ColeccionDinamica', dinamicSchema);

				ColeccionDinamica.find({}, (err, coleccionDinamica) => {
					delete bbdd.connection.models['ColeccionDinamica'];
					// bbdd.connection.close()
					bbdd.disconnect()
					console.log(chalk.yellow('----> Desconectado de: ' + bbdd.connection.name) )
					return res.status(200).send(coleccionDinamica)
				})				
			})
			.catch((err) => {
				console.log('++++++++++++ ERROR')
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