const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const chalk = require('chalk');

const config = require('./config')
const api = require('./routes/api')
const public = require('./routes/public')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)
app.use('/', public)

mongoose.connect(config.db, {useNewUrlParser: true}, (err, res) => {
	if (err) {
		return console.log(chalk.red(`Error al conectar a la base de datos: ${err}`))
	}
	
	console.log(chalk.green('Conexión a la base de datos realizada...'))
	app.listen(config.port, () => {
		console.log(`Servidor corriendo en http://localhost: ${config.port}`)
	})
})


