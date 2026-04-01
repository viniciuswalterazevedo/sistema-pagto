const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express()


//Configs
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


//Rotas
app.use('/pagamento', require(path.join(__dirname, '.', 'routes', 'checkout.js')))
app.use('/validacao', require(path.join(__dirname, '.', 'routes', 'validador.js')))


//Templates
app.use('/render', require(path.join(__dirname, '.', 'routes', 'render.js')))


app.listen(process.env.PORTA, ()=>{
    console.log(`Servidor operando na porta ${process.env.PORTA}`)
})