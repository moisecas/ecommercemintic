const express = require('express');
const app = express(); 
const errorMiddleware = require("./middleware/errors")
const cookieParser=require("cookie-parser")

//Uso de constantes importadas
app.use(express.json()); //para poder usar json en el body
app.use(cookieParser());//Primero debe pasar por cookie parser para garantizar que no pasará a una ruta sin autorizacion

//importamos las rutas
const products = require('./routes/products'); //importamos el archivo de rutas de productos
const users= require ("./routes/auth")//Importamos rutas de auth
const ordenes = require('./routes/orders'); //importamos el archivo de rutas de ordenes

//creamos las rutas
app.use('/api', products); //creamos la ruta
app.use('/api', users); //creamos la ruta usuarios
app.use('/api', ordenes); //creamos la ruta de ordenes

//MidlleWares para manejar errores
app.use(errorMiddleware)

module.exports = app; //exportamos el modulo 

