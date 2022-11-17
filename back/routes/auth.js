const express = require ("express");
const { newUser, loginUser, logOut, forgotPassword, resetPassword, getUserProfile, 
    updatePassword, updateProfile, getAllUsers, getUserDetails, updateUser, deleteUser} = require("../controllers/authController");



const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route('/usuario/registro').post(newUser);//creamos la ruta, post es para crear, route es para crear una ruta, newProduct es el metodo que vamos a ejecutar

router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticatedUser,logOut)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)
router.route('/activeUser').get(isAuthenticatedUser,getUserProfile)
router.route('/activeUser/updatePassword').put(isAuthenticatedUser,updatePassword)
router.route('/activeUser/updateProfile').put(isAuthenticatedUser, updateProfile)

//Rutas admin
router.route('/admin/allUsers').get( isAuthenticatedUser, authorizeRoles("admin"),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route('/admin/updateUser/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
router.route('/admin/deleteUser/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router;