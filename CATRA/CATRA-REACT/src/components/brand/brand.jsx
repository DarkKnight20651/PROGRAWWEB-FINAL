import React from 'react'
import './brand.css'
import SEP from '/src/assets/SEP.png'
import Conocer from '/src/assets/Conocer.jpg'
import Stp from '/src/assets/logotrabajo.png'
const brand = () => {
  return (
    <div className='catra__brand'>
      <div className='catra__brand__content'>

        <div className='catra__brand__content-text'>
          <h1>Somos reconocidos ante</h1>
        </div>

        <div className='catra__brand__content-image'>
          <img src={SEP} alt='SEP' />
          <img src={Conocer} alt='Conocer ' />
          <img src={Stp} alt='Stp ' />
        </div>
      </div>
    </div>
  )
}

export default brand
