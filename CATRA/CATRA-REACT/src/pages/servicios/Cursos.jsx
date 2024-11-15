import React from 'react'
import './Cursos.css';
import { Container, Table, Button } from 'react-bootstrap';
import CATRAImage from '../../assets/CATRA.png';
import { Footer, Header, Blog, Features, Posibility, WhatCATRA } from '../../containers'
import { Article, Cta, Navbar, Brand, Feature } from '../../components'
const Cursos = () => {
  return (
    <div className="App gradient__bg">
      <div className="gradient__bg">
        <Navbar />
      </div>

      <div className="services-section">
        <h2>Nuestros servicios</h2>
        <div className="service-panel">
          <div className="service-item">
            <h3>Trámite De Licencias Federales</h3>
            <p>Proporcionamos acompañamiento en el trámite de OBTENCION Y RENOVACION de la licencia federal de conductor, modalidad nacional e internacional en las siguientes categorías.</p>
            <a className="btn btn-secondary" href="#licencias">Más información</a>
          </div>
          <div className="service-item">
            <h3>Cursos de Capacitación por Estándar de Competencias</h3>
            <p>El Sistema Nacional de Competencias (SNC) es un instrumento del Gobierno Federal que contribuye a la competitividad económica, al desarrollo educativo y al progreso social de México, con base en el fortalecimiento de las competencias de las personas.</p>
            <a className="btn btn-secondary" href="#estandarcomp">Más información</a>
          </div>
          <div className="service-item">
            <h3>Proceso de Certificación ISO</h3>
            <p>Un Sistema de Gestión de Calidad es la aplicación de técnicas y medidas para el mejoramiento de los procesos internos de una compañía, sin importar cuál sea el área en la que se desempeñe.</p>
            <a className="btn btn-secondary" href="#iso">Más información</a>
          </div>
          <div className="service-item">
            <h3>Exámenes Médicos Avalados por la STPS</h3>
            <p>Contamos con médicos capacitados para la realización de exámenes y expedición de certificados avalados por la STPS.</p>
            <a className="btn btn-secondary" href="#examenes">Más información</a>
          </div>
        </div>
      </div>

      <section class="py-3 text-center container" id="estandarcomp">
        <div class="row py-lg-3">
          <div class="col-lg-8 col-md-10 mx-auto">
            <h1 class="fw-light">Cursos de Capacitación por
              Estándar de Competencias</h1>
            <p class="lead text-body-secondary">El Sistema Nacional de Competencias (SNC) es un instrumento del Gobierno Federal que contribuye a la competitividad económica, al desarrollo educativo y al progreso social de México, con base en el fortalecimiento de las competencias de las personas.</p>
            <div class="row">
              <div class="col-lg-4">
                <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />
                <h2 class="fw-normal">Listado de estándares</h2>
                <p>Explora nuestra lista de estándares para obtener información detallada sobre calidad, seguridad y excelencia</p>
                <p><a class="btn btn-secondary" href="#">Descargar</a></p>
              </div>
              <div class="col-lg-4">
                <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />        <h2 class="fw-normal">Ejemplo de certificado del conocer</h2>
                <p>Descubre un ejemplo detallado de certificado del conocer para comprender los estándares de competencia y formación profesional</p>
                <p><a class="btn btn-secondary" href="#">Descargar»</a></p>
              </div>
              <div class="col-lg-4">
                <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />        <h2 class="fw-normal">Requisitos </h2>
                <p>Descubre los requisitos clave para obtener el certificado en estándares de competencias</p>
                <p><a class="btn btn-secondary" href="#">Descargar</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section id="licencias">
        <div class="album py-5 bg-body-tertiary" >
          <div class="container">
            <h1 class="fw-light">Categorias</h1>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

              <div class="col">
                <div class="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />            <div class="card-body">
                    <p class="card-text">Categoria "A" </p>
                    <p class="card-text">Del autotransporte federal y privado de pasaje y turismo.</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="#" class="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small class="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />            <div class="card-body">
                    <p class="card-text">Categoria "B" </p>
                    <p class="card-text">Del autotransporte federal y privado de carga general en tractocamión quinta rueda.</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="#" class="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small class="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />            <div class="card-body">
                    <p class="card-text">Categoria "C" </p>
                    <p class="card-text">Del autotransporte federal y privado de carga general en camión unitario. </p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="#" class="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small class="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />
                  <div class="card-body">
                    <p class="card-text">Categoria "D" </p>
                    <p class="card-text">Para el servicio de autotransporte de pasajeros de turismo en el servicio de chofer guía.</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="#" class="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small class="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />
                  <div class="card-body">
                    <p class="card-text">Categoria "E" </p>
                    <p class="card-text">Servicio de autotransporte Doble articulado. Carga de materiales y residuos peligrosos. </p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="#" class="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small class="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />
                  <div class="card-body">
                    <p class="card-text">Categoria "F" </p>
                    <p class="card-text">Servicio de autotransporte de pasajeros en el servicio de transporte terrestre y hacia los puertos marítimos y aeropuertos. </p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="#" class="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small class="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>




            </div>


          </div>


        </div>
      </section>







      <Footer />

    </div>
  )
}

export default Cursos
