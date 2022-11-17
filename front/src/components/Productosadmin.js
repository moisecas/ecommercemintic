import React, { Fragment } from 'react'


const Productosadmin = () => {

  function productocreado(){
    alert('Producto creado')
  }
  return (
    <Fragment>
      <center><h1>Productos Admin</h1></center>
      <form class="container">
        <div >
          <label for="exampleInputEmail1">Nombre Producto</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="nombre producto"/>
          <small id="emailHelp" className="form-text text-muted">Crear producto</small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Descripción</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Descripción"/>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Precio</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Precio"/>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Imagen</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="url imagen"/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={productocreado} >Submit</button>
      </form>

    </Fragment>

  )
}

export default Productosadmin