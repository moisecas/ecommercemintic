const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    envioInfo:{
        direccion:{
            type:String,
            required:true
        }, //direccion de envio
        ciudad:{
            type:String,
            required:true
        }, //ciudad de envio
        telefono:{
            type:String,
            required:true

        },
        departamento:{
            type:String,
            required:true

        }
   
    },
    //relacion con el usuario
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'auth'
    },
    //relacion con el producto
    items:[{
        nombre:{
            type:String,
            required:true
    },
        cantidad:{
            type:Number,
            required:true
        },
        imagen:{
            type:String,
            required:true
        },
        precio:{
            type:Number,
            required:true
        },
        producto:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:'productos'
        }
    }],
    pagoInfo:{
        id:{
            type:String
        },
        estado:{
            type:String
        }
    },
    fechaPago:{
        type:Date
    },
    precioItems:{
        type:Number,
        required:true,
        default:0.0
    },
    precioItems:{
        type:Number,
        required:true,
        default:0.0
    },
    precioImpuesto:{
        type:Number,
        required:true,
        default:0.0
    },
    precioEnvio:{
        type:Number,
        required:true,
        default:0.0
    },
    precioTotal:{
        type:Number,
        required:true,
        default:0.0
    },
    estado:{
        type:String,
        required:true,
        default:'pendiente por estado'
    },
    fechaEnvio:{
        type:Date
    },
    fechaCreacion:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('order',orderSchema);


