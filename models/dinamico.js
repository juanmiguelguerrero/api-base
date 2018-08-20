const mongoose = require('mongoose')
const Schema = mongoose.Schema

function ModeloDinamico(coleccion) {
	
	let dinamicSchema = new Schema(coleccion.model, { collection: coleccion.name })
	const ddbb = mongoose.createConnection('mongodb://localhost:27017/' + coleccion.projectId)
	
	return ddbb.model('ColeccionDinamica', dinamicSchema);
	
	// return mongoose.model('ColeccionDinamica', dinamicSchema)
	// console.log(coleccionDinamica.schema)
}

module.exports = ModeloDinamico