//acá va toda la funcionalidad crud lo que pasa con el schema de productos 

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const producto = require('../models/productos'); //importamos el modelo de productos
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url)); //importamos el fetch de node-fetch 

//ver lista de productos 
exports.getProducts = catchAsyncErrors(async (req, res, next) => { //trabaja con un requisito, una respuesta y un next, ejecute una acción al terminar
    
    const resPerPage = 4;
    const productsCount = await producto.countDocuments();

    const apiFeatures = new APIFeatures(producto.find(), req.query)
        .search()
        .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount= products.length;
    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})


//consulta por id
exports.getProductById = catchAsyncErrors( async (req, res, next) => {
    const product = await producto.findById(req.params.id); //buscamos un producto por id, el req.params.id es el id que viene por la url, corresponde al producto que busco
    //debe llamarse product diferente al declarado al inicio, del req busque un parametro params que va por id. 
    //si existe o no
    if(!product){//si no existe el producto
            if (!product){
                return next (new ErrorHandler("Producto no encotrado",404))
            }//Aplicando Error handler

    }
    res.status(200).json({
        success: true,
        message: 'Mostrar producto',
        product

    }) //res status 200 es que todo esta bien, json es un objeto

}) //trabaja con un requisito, una respuesta y un next, ejecute una acción al terminar

//actualizar producto
exports.updateProduct = catchAsyncErrors(async (req, res, next) => { //async para que sea asincrono, req es el request, res es la respuesta, next es para que ejecute una acción al terminar
    let product = await producto.findById(req.params.id); //buscamos un producto por id, el req.params.id es el id que viene por la url, corresponde al producto que busco

    if (!product){
        return next(new ErrorHandler("Producto no encontrado",404))
        }

    product = await producto.findByIdAndUpdate(req.params.id, req.body, { //el metodo necesita el id, el body que viene del front, y un objeto con las opciones
        new: true, //devuelve el producto actualizado
        runValidators: true //corre las validaciones del modelo
    }) //actualizamos el producto, el req.params.id es el id que viene por la url, corresponde al producto que busco, el req.body es lo que viene del front, el {new: true, runValidators: true} es para que devuelva el producto actualizado y que corra las validaciones
    res.status(200).json({
        success: true,
        message: 'Producto actualizado',
        product  //producto actualizado 
    }) //res status 200 es que todo esta bien, json es un objeto
})


//eliminar producto
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => { //async para que sea asincrono, req es el request, res es la respuesta, next es para que ejecute una acción al terminar
    const product = await producto.findById(req.params.id); //buscamos un producto por id, el req.params.id es el id que viene por la url, corresponde al producto que busco

    if (!product){
        return next(new ErrorHandler("Producto no encontrado",404))
        }

    await product.remove(); //eliminamos el producto, remove() es un método de mongoose que elimina el producto
    res.status(200).json({
        success: true,
        message: 'Producto eliminado' //mensaje de producto eliminado
    }) //res status 200 es que todo esta bien, json es un objeto
})   


//crear nuevo producto => /api/v1/producto/nuevo
exports.newProduct = catchAsyncErrors(async (req, res, next) => { //req es el request, res es la respuesta, next es para que ejecute una acción al terminar
    req.body.user=req.user.id;//primero busco el usuario
    const product = await producto.create(req.body); //el req que traemos del front, body es el cuerpo del request, creamos un producto con el modelo de productos, el req.body es lo que viene del front
    res.status(201).json({ //respondo con un status 201 que es que se creo un nuevo recurso, json es un objeto y con el producto que creamos
        success: true,
        product
    }) //status 201 es que se creo un nuevo recurso
}) //trabaja con un requisito, una respuesta y un next, ejecute una acción al terminar
//promesa para crear un nuevo producto espero que se cree y luego lo muestro en la consola

//Crear una review 
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
    const { rating,comentario,idProducto} = req.body;

    const opinion = {
        nombreCliente : req.user.nombre,
        rating:Number(rating),
        comentario
    }

    const product= await producto.findById(idProducto);

    const isReviewed = product.opiniones.find(item=>
        item.nombreCliente === req.user.nombre)

        if (isReviewed){
            product.opiniones.forEach(opinion=>{
                if(opinion.nombreCliente=== req.user.nombre){
                    opinion.comentario = comentario,
                    opinion.rating=rating
                }
            })
        }else{
            product.opiniones.push(opinion)
            product.numCalificaciones = product.opiniones.length
        }

        product.calificacion= product.opiniones.reduce((acc, opinion)=>
        opinion.rating + acc, 0)/product.opiniones.length  //Con esta linea se logra calcular el promedio de calificaciones

        await product.save({validateBeforeSave:false});
        res.status(200).json({
            success:true,
            message:"Hemos opinado correctamente"
        })
})

//Ver todas las review de un producto
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.query.id)

    res.status(200).json({
        success: true,
        opiniones: product.opiniones
    })
})

//Eliminar review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.query.idProducto);

    const opiniones = product.opiniones.filter(opinion => 
        opinion._id.toString() !== req.query.idReview.toString());

        const numCalificaciones = opiniones.length;

        const calificacion = product.opiniones.reduce((acc, Opinion) =>
            Opinion.rating + acc, 0) / opiniones.length;

        await producto.findByIdAndUpdate(req.query.idProducto, {
            opiniones,
            calificacion,
            numCalificaciones
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            message: "review eliminada correctamente"
        })

    })


//Metodo fetch 

// //para traer los productos
// function fetchProducts() {
//     fetch('http://localhost:4000/api/productos') //fetch es una función de js, fetch('/api/productos') es la url que voy a consumir
//     .then(res => res.json()) //promesa, convierte la respuesta en json, con esa info arme la respuesta
//     .then(data => { //promesa, data es el json que viene de la respuesta
//         console.log(data) //muestro en la consola el json que viene de la respuesta
//     })
//     .catch(err => console.log(err)) //promesa, si hay un error lo muestro en la consola 
// }
// //fetchProducts() //ejecuto la función fetchProducts para que me traiga los productos de la api

// //para traer un producto por id
// function verProductoPorID(id){
//     fetch('http://localhost:4000/api/producto/'+id)
//     .then(res=>res.json())
//     .then(res=>console.log(res))
//     .catch(err=>console.error(err))
// } 

// verProductoPorID('6345d5f757cd66bbd7318dd5') //ejecuto la función fetchProduct para que me traiga el producto de la api

