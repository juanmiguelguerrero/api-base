const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProyectoSchema = Schema ({
	
	id: { type: String, required: true },
	name: { type: String, required: true },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	uri: String,
	collections: [
		{
			id: { type: String, lowercase: true},
			name: String,
			description: String,
			uri: String
		}
	]

}, { collection: 'proyectos' })

module.exports = mongoose.model('Proyecto', ProyectoSchema)