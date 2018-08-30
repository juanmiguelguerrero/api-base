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
			id: { type: String, required: true, lowercase: true },
			projectId: { type: String, required: true },
			name: { type: String, required: true },
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now },
			model: { type: String }
		}
	]

}, { collection: 'proyectos' })

module.exports = mongoose.model('Proyecto', ProyectoSchema)