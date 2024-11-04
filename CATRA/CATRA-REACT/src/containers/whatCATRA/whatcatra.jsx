import React from 'react'
import './whatcatra.css'
import { Feature } from '../../components'
const whatcatra = () => {
  return (
    <div className='catra__whatiscatra section__margin' id='catra'>
      <div className='catra__whatiscatra-feature '>
        <Feature title= "Que es catra" text=" CATRA se distingue por ofrecer cursos y asesoría de alta calidad tanto para individuos como para empresas y entidades gubernamentales a nivel nacional."/>
      </div>
      
      <div className='catra__whatiscatra-heading'>
        <h1 className='gradient-text'>
          Logra obtener tu licencia con CATRA
        </h1>
        <p>Explora nuestros cursos</p>
      </div>
      <div className='catra__whatiscatra-container'>
        <Feature title="Tipo A"  text="Del autotransporte federal y privado de pasaje y turismo." />
        <Feature title="Tipo B" text="Del autotransporte federal y privado de carga general en tractocamión quinta rueda." />
        <Feature title="Tipo C" text="Del autotransporte federal y privado de carga general en camión unitario. "/>
        <Feature title="Tipo D"  text="Para el servicio de autotransporte de pasajeros de turismo en el servicio de chofer guía"/>
        <Feature title="Tipo E"  text=" Servicio de autotransporte Doble articulado. Carga de materiales y residuos peligrosos. " />
        <Feature title="Tipo F"  text="Servicio de autotransporte de pasajeros en el servicio de transporte terrestre y hacia los puertos marítimos y aeropuertos. "/>
      </div>
    </div>
  )
}

export default whatcatra
