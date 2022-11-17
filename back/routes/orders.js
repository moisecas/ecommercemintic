const express = require('express'); //importamos express
const router = express.Router(); //creamos un router, para crear rutas

const { newOrder,  //traemos los metodos del controlador
    getOneOrder, 
    myOrders, 
    allOrders,
    UpdateOrder,
    deleteOrder
} = require("../controllers/orderController");


//traer los metodos de autenticación a la ruta
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

//rutas 

router.route('/order/nuevo').post(isAuthenticatedUser, newOrder); //creamos la ruta, post es para crear, route es para crear una ruta, newOrder es el metodo que vamos a ejecutar
router.route('/order/:id').get(isAuthenticatedUser, getOneOrder); //creamos la ruta, get es para obtener, route es para crear una ruta, getOneOrder es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro
router.route('/orders/yo').get(isAuthenticatedUser, myOrders); //creamos la ruta, get es para obtener, route es para crear una ruta, myOrders es el metodo que vamos a ejecutar

//rutas admin 
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders); //creamos la ruta, get es para obtener, route es para crear una ruta, allOrders es el metodo que vamos a ejecutar
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), UpdateOrder); //creamos la ruta, put es para actualizar, route es para crear una ruta, updateOrder es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder); //creamos la ruta, delete es para eliminar, route es para crear una ruta, deleteOrder es el metodo que vamos a ejecutar, es necesario el :id para que sepa que es un parametro



module.exports = router; //exportamos el modulo para que lo pueda usar el server