# Proyecto Express

Guía paso a paso para crear un proyecto Express desde cero

---

## Iniciar proyecto

Ejecuta `npm init` para iniciar el proyecto de Node

Presiona enter para todas las configuraciones por defecto

---

## Crear estructura

Crea la carpeta `src` con los archivos `index.js`, `app.js` y `config.js`

---

## Configurar variables

Pega este contenido en `config.js`

Allí estarán todas las variables globales

```js
module.exports = {
    app: {
        port: process.env.PORT || 3000
    }
}
```

---

## Configurar entrada

Pega este contenido en `index.js`

```js
const app = require('./app')

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`)
})
```

---

## Actualizar scripts

Ve a `package.json` y sustituye los scripts

Reemplaza esto:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

Por esto:

```json
"scripts": {
    "dev": "nodemon /src/index.js"
  }
```

---

## Instalar dependencias

Ejecuta `npm i express nodemon`

Esto instala Express y nodemon

---

## Configurar aplicación

Pega este contenido en `app.js`

```js
const express = require('express')
const config = require('./config')
const app = express()

// configuracion
app.set('port', config.app.port)

// rutas

module.exports = app
```

---

## Variables de entorno

Crea el archivo `.env` para configurar variables de entorno

Es importante correr `npm i dotenv -D` para poder usar `.env`

```env
PORT = 3000
```

---

## Cargar configuración

Agrega esto a `config.js`

```js
require('dotenv').config()
```

---

## Crear helpers

Crea `src/red/respuestas.js` y pega este contenido

Son helpers para respuestas HTTP

```js
exports.success = function (req, res, mensaje = '', status = 200) {
   
  res.status(status).send({
    error: false,
    status: status,
    body: mensaje
  })
}

exports.error = function (req, res, mensaje ='Error interno del servidor', status = 500) {

  res.status(status).send({
    error: true,
    status: status,
    body: mensaje
  })
}
```

---

## Conectar base de datos

Crea `src/DB/mysql.js` y pega este contenido

Es la conexión a la base de datos

```js
const mysql = require('mysql')
const config = require('../config')

function todos (tabla){
    
}

function uno (tabla, id){

}

function agregar (tabla, data){

}

function eliminar (tabla, id){

}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}
```

---

## Crear controlador

Crea `src/modulos/<nombre>/controlador.js` y pega este contenido

Es el controlador de la ruta

```js
const db = require('../../DB/mysql')
const respuestas = require('../../red/respuestas')
const { success, error } = respuestas

const TABLA = 'clientes'

function todos (){
    return db.todos(TABLA)
}

module.exports = {
    todos
}