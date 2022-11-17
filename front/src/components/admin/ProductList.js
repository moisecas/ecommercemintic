import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import {Link } from "react-router-dom"

export const ProductList = () => {
    const { loading, products} = useSelector(state=> state.products)
    //const alert= useAlert();

    const dispatch = useDispatch();
    useEffect(() => {
        // if (error){
        //     return alert.error(error)
        // }

        dispatch(getProducts());
    }, [dispatch])


    const setProducts = () => { //funcion para mostrar los productos en la tabla
        const data = { //data es un objeto
            columns: [ //se reemplaza luego por la data de la base de datos
                {
                    label: 'Nombre',
                    field: 'nombre',
                    sort: 'asc'
                },
                {
                    label: 'Precio',
                    field: 'precio',
                    sort: 'asc'
                },
                {
                    label: 'Inventario',
                    field: 'inventario',
                    sort: 'asc'
                },
                {
                    label: 'Vendedor',
                    field: 'vendedor',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'actions',
                },
            ],
            rows: [] //tantas filas como productos haya en la base de datos
        }
        products.forEach(product => { //recorro todos los productos por cada producto que encuentre voy a crear una fila
            data.rows.push({ //agrego una fila a la tabla con los datos del producto que estoy recorriendo en ese momento 
                nombre: product.nombre, 
                precio: `$${product.precio}`,
                inventario: product.inventario,
                vendedor: product.vendedor,
                actions: <Fragment> {/* fragment es un contenedor que no se muestra en el html */}
                    <Link to={`/producto/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link><Link to="/" className="btn btn-warning py-1 px-2">
                    <i class="fa fa-pencil"></i>
                    </Link>

                    <Link to="/" className="btn btn-danger py-1 px-2">
                        <i className="fa fa-trash"></i>
                    </Link>
                    

                </Fragment>
            })
        })

        return data; //devuelvo la data con los productos
    }

  return (
    <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar /> {/* sidebar requerido*/}
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Productos Registrados</h1>

                        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> :(
                            <MDBDataTable //tabla de mdbreact para mostrar los productos
                                data={setProducts()} //le paso la data que cree con la funcion setProducts
                                className="px-3"
                                bordered //borde de la tabla
                                striped //filas alternadas
                                hover   //efecto hover en las filas de la tabla 
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
  )
}

export default ProductList