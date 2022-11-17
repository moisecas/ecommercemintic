import axios from 'axios';

import { ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'; //importamos las constantes  

// Get all products
export const getProducts = (currentPage = 1, keyword= '') => async (dispatch) => { //dispatch es una funcion que me permite ejecutar una accion
    try { //intente hacer esto
        dispatch({ type: ALL_PRODUCTS_REQUEST }); //ejecutar la accion de tipo ALL_PRODUCTS_REQUEST

        const {data} = await axios.get(`/api/productos?keyword=${keyword}&page=${currentPage}`) //obtener los productos de la base de datos')

        dispatch({ //ejecutar la accion de tipo ALL_PRODUCTS_SUCCESS
            type: ALL_PRODUCTS_SUCCESS,
            payload: data //paquete de productos
        })

        
    }catch(error){
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message //mensaje de error
        }) //ejecutar la accion de tipo ALL_PRODUCTS_FAIL
    } //si algo sale mal haga esto 
}

// Get product details
export const getProductDetails = (id) => async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/producto/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    }catch (error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear errors
export const clearErrors = () => async (dispatch) => { //funcion asincrona que recibe dispatch como parametro
    dispatch({
        type: CLEAR_ERRORS
    })
}; //limpiar errores