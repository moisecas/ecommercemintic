import React from 'react'
import Table from 'react-bootstrap/Table' 

const Ventasadmin = () => {
  return (
    <div className='salesadmin' >
        <h1>Historico de ventas</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Primer nombre</th>
          <th>Segundo nombre</th>
          <th>Usuario</th>
          <th>Fecha</th>
          <th>Producto</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>20/10/22</td>
          <td>Curso java</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>28/10/22</td>
          <td>Curso java 2</td>
        </tr>
        
      </tbody>
    </Table>
        



    </div>
  )
}

export default Ventasadmin