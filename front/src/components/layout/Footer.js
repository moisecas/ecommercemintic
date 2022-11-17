import React, { Fragment } from 'react'

const Footer = () => {
  return (
    <Fragment>
        <footer className='py-1'>
            <p className='text-center mt-1'>
                Aplicativo web para vender cursos online desarrollado por el A-Team &copy; {new Date().getFullYear()}
            </p>
        </footer>


    </Fragment>
  )
}

export default Footer