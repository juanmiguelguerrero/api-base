const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const api = require('./routes/api')
const public = require('./routes/public')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)
app.use('/', public)

mongoose.connect(config.db, (err, res) => {
	if (err) {
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	
	console.log('Conexión a la base de datos realizada...')
	app.listen(config.port, () => {
		console.log(`Servidor corriendo en http://localhost: ${config.port}`)
	})
})


