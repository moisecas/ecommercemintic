const mongoose = require('mongoose'); //importamos mongoose

//metodo para conexión a la base de datos
const connectDB =  () => { //promesa, espero que se conecte a la base de datos
    mongoose.connect(process.env.DB_LOCALURI, { //sintaxis del metodo connect 
        useNewUrlParser: true, //analiza el uso de la url, permite paso de datos. True es para que lo use
        useUnifiedTopology: true, //json en cascada y deben coincidir los nombres de los campos


    }).then(con => { 
        console.log(`MongoDB conectado: ${con.connection.host}`) //mensaje de conexion. con.connection.host es la url de conexion a la base de datos
    }).catch(err => console.log(err)) //si hay un error lo muestro en la consola
    //then es para que ejecute una funcion cuando se conecte a la base de datos
    //configuramos la conexión
}

module.exports = connectDB; //exportamos el modulo para que lo pueda usar el server