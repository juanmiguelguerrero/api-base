# Test para ruta completa colección


### Listar Proyectos

https://api-design.herokuapp.com/api/proyectos/


### Crear nuevo Proyecto

Enviar por POST a https://api-design.herokuapp.com/api/proyecto/

{"name": "Nombre del proyecto"}


### Crear nueva Colección

Enviar por POST a https://api-design.herokuapp.com/api/:idProyecto

{
	"name": "pepe",
	"model": {
		"texto": { "type": "String" },
		"numero": { "type": "Number"}
	}
}

### Crear un registro de datos en una colección

Enviar por POST a http://localhost:3000/:idProyecto/:nombreColeccion

{
	"name": "coluno",
	"model": {
		"texto": { "type": "String" },
		"numero": { "type": "Number"}
	}
}


Ejemplos BBDD local:

http://localhost:3000/cxeb7b3cim/coldos

http://localhost:3000/idgxif9wj/pepe

