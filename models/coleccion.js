const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColeccionSchema = Schema ({

	id: { type: String, required: true, lowercase: true },
	projectId: { type: String, required: true },
	name: { type: String, required: true },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	model: {}

}, { collection: 'colecciones' })

module.exports = mongoose.model('Coleccion', ColeccionSchema)