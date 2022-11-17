//modelo schema de productos con sus propiedades y sus validaciones 

const mongoose = require('mongoose'); //importamos mongoose

const productosSchema = new mongoose.Schema({
    nombre: { //declaracion de atributos 
        type: String, //tipo de dato
        required: [true, 'Por favor ingrese el nombre del producto'], //requerido, mensaje de error
        trim: true, //quita espacios en blanco al inicio y al final del string 
        maxlength: [120, 'El nombre del producto no puede tener mas de 120 caracteres'] //longitud maxima, mensaje de error

    },
    precio: {
        type: Number,
        required: [true, 'Por favor ingrese el precio del producto'],
        maxlength: [9, 'El precio del producto no puede tener mas de 9 caracteres'], //se deben separar por comas 
        default: 0.0 //valor por defecto, eliminar la posibilidad del error de que no se ingrese un precio
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor ingrese la descripcion del producto'],
           
    },
    calificacion: {
        type: Number,
        default: 0.0 //valor por defecto, eliminar la posibilidad del error de que no se ingrese una calificacion

    },
    imagen: [ //array de varias imagenes 
        {
            public_id: { //id de la imagen
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true

            } //url de la imagen
        }
    ],
    categoria: {
        type: String,
        required: [true, 'Por favor ingrese la categoria del producto'],
        enum: {
            values: [
                "web",
                "javascript",
                "java",
                "linux",
                "python",
                "logicaprogramacion",
                "SQL",
                "AWS",
                "android",
                "cloud"
            ],
        } //enum es para que solo se puedan ingresar los valores que se encuentran en el array
    },
    vendedor: {
        type: String,
        required: [true, 'Por favor ingrese el vendedor del producto']
    },
    inventario: {
        type: Number,
        required: [true, 'Por favor ingrese el stock del producto'],
        maxlength: [5, 'El stock del producto no puede tener mas de 5 caracteres'],
        default: 0 //valor por defecto, eliminar la posibilidad del error de que no se ingrese un stock

    }, 
    numCalificaciones: {
        type: Number,
        default: 0 //valor por defecto, eliminar la posibilidad del error de que no se ingrese un numero de calificaciones

    },
    opiniones:[ //array de opiniones
        {
            nombreCliente:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comentario:{
                type: String,
                required: true 
            } //comentario del cliente

        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    fechaCreacion: {
        type: Date,
        default: Date.now //fecha de creacion del producto

    }

    

})//creamos el schema, es la estructura de la base de datos

module.exports = mongoose.model('productos', productosSchema); //exportamos el modulo para que pueda ser usado. Exportado como modelo de mongoose. 'productos' es el nombre del modelo, productosSchema es el schema
//exportelo como modelo de moonose y se alimenta de productosSchema 

