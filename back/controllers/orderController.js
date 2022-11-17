const Order = require('../models/order');
const Product = require('../models/productos');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

//crear order 

exports.newOrder = catchAsyncErrors (async (req,res,next)=>{
    const { 
        Items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo
    } = req.body;  //obtenemos los datos del body que viene del front o del postman

    const order = await Order.create({
        Items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo,
        fechaPago: Date.now(),
        user:req.user._id 
    })

    res.status(200).json({
        success:true,
        order
    })

})

//ver order 
exports.getOneOrder = catchAsyncErrors (async (req,res,next)=>{
    //order user
    const order = await Order.findById(req.params.id).populate('user','nombre email'); //populate es para traer los datos del usuario que creo el producto, el segundo parametro es para traer solo el nombre y el email

    if(!order){
        return next(new ErrorHandler('No se encontro el pedido',404)); //usamos el manejador de errores
    }
    res.status(200).json({
        success:true,
        order
    })
})

//ver todos los orders
exports.myOrders = catchAsyncErrors (async (req,res,next)=>{
    const orders = await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders //las ordenes del usuario
    })
})

//ordenes como admin 
exports.allOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find()

    let cantidadTotal=0
    orders.forEach(order =>{
        cantidadTotal=cantidadTotal+order.precioTotal
    })
    res.status(200).json({
        success:true,
        cantidadTotal,
        orders
    })
})

//editar una orden como admin
exports.UpdateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No se encontro el pedido',404)); //usamos el manejador de errores
    }

    if(order.estado==='Enviado'){
        return next(new ErrorHandler('No se puede editar un pedido enviado',400)); //usamos el manejador de errores
    }

    order.estado=req.body.estado
    order.fechaEnvio=Date.now()

    await order.save()

    res.status(200).json({
        success:true,
        order
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.inventario = product.inventario - quantity;

    await product.save({validateBeforeSave:false});
}

//eliminar una orden como admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No se encontro el pedido',404)); //usamos el manejador de errores
    }

    await order.remove()

    res.status(200).json({
        success:true,
        message:'Pedido eliminado'
    })
})