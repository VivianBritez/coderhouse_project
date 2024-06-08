const express = require('express')
const app = express()
const routes = require('./routers/index');
const path = require('path')

app.use(express.json());
app.use('/', routes)
// Middleware para servir archivos estáticos
app.use(express.static(`${path.resolve('src')}/public`));

module.exports = app