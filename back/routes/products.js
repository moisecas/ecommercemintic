const express = require('express'); //importamos express 
const router = express.Router(); //creamos un router, para crear rutas 

const {getProducts, newProduct,getProductById,updateProduct,deleteProduct, getProductReviews, createProductReview, deleteReview} = require('../controllers/productsController'); //importamos los metodos del controlador, creando el servicio
const { isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

router.route('/productos').get(getProducts); //creamos la ruta, get es para obtener, post es para crear, route es para crear una ruta, getProducts es el metodo que vamos a ejecutar, createProduct es el metodo que vamos a ejecutar
router.route('/producto/nuevo').post(isAuthenticatedUser, authorizeRoles("admin"),newProduct); //creamos la ruta, post es para crear, route es para crear una ruta, newProduct es el metodo que vamos a ejecutar
router.route('/producto/:id').get(getProductById); //creamos la ruta, get es para obtener, route es para crear una ruta, getProductById es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro
router.route('/producto/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct); //creamos la ruta, put es para actualizar, route es para crear una ruta, updateProduct es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro
router.route('/producto/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct); //creamos la ruta, delete es para eliminar, route es para crear una ruta, deleteProduct es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro

//Rutas review
router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews)
//http://localhost:4000/api/reviews?id=6356e7c71d28c1d6fa0f2a02(en postman con query)
router.route("/review").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReview)
//http://localhost:4000/api/review?idProducto=6356e7c71d28c1d6fa0f2a02&idReview=63701e9e088458265824c58f(para probar en postman)

module.exports = router; //exportamos el modulo para que lo pueda usar el server 