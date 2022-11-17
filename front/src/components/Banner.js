import React from 'react'
import {Carousel} from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../assets/banner/uno.png'
import slide2 from '../assets/banner/dos.png'
import slide3 from '../assets/banner/tres.png'

const Banner = () => {
    
    
  return (
    <Carousel>
        <Carousel.Item>
            <img className="d-block w-100" 
            src={slide1} 
            alt="slide1" />
            <Carousel.Caption>
                <h3>Oferta del día</h3> 
                <p>Adquiere skills</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" 
            src={slide2} 
            alt="slide2" />
            <Carousel.Caption>
                <h3>Oferta del día</h3> 
                <p>Adquiere skills</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" 
            src={slide3} 
            alt="slide3" />
            <Carousel.Caption>
                <h3>Oferta del día</h3> 
                <p>Adquiere skills</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  )
}


export default Banner; 