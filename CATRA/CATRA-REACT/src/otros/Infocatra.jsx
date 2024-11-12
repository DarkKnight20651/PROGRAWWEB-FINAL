import React from 'react'
import './App.css'
import './Infocatra.css'
import { Footer, Header, Blog, Features, Posibility, WhatCATRA } from '../containers'
import { Article, Cta, Navbar, Brand,Feature } from '../components'
const Infocatra = () => {
  return (
    <div className="App gradient__bg">
      <div className="gradient__bg">
        <Navbar />


      </div>
      <div className='catra__infocatra'>


        <div className='catra__infocatra__mision'>
          <Feature title="Misión" text="Facilitar el proceso de obtención de licencias federales y ofrecer cursos de capacitación especializados, comprometidos con la eficiencia, seguridad y cumplimiento normativo para empresas y entidades gubernamentales a nivel nacional." />
          </div>
          
        <div className='catra__infocatra__vision'>
          <Feature title="Visión" text="Ser líderes reconocidos en la gestión de trámites de licencias federales y capacitación especializada, promoviendo la excelencia y seguridad en el ámbito laboral y gubernamental, expandiendo nuestra influencia a nivel nacional." />
          </div>
          <div/>
        <div className='catra__infocatra__politica'>
          <Feature title="Política de la Empresa" text="Brindar capacitaciones para obtener y renovar la licencia federal del conductor, satisfaciendo las necesidades y expectativas de los clientes, proporcionando instructores con conocimientos para impartir las capacitaciones, cumpliendo con los requisitos de la Norma ISO 9001:2015 y asegurando una mejora continua en el sistema de gestión de calidad." />
            </div>
      </div>
      <Footer />

    </div>
  )
}

export default Infocatra
