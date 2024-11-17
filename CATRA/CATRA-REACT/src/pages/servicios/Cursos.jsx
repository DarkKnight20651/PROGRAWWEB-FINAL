import CATRAImage from '../../assets/CATRA.png';
import { Navbar } from '../../components';
import { Footer } from '../../containers';

import '../../styles/index.css'
import '../../assets/bootstrap.min.css'
import './Cursos.css';

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

      <section className="py-3 text-center container" id="estandarcomp">
        <div className="row py-lg-3">
          <div className="col-lg-8 col-md-10 mx-auto">
            <h1 className="fw-light">Cursos de Capacitación por
              Estándar de Competencias</h1>
            <p className="lead text-body-secondary">El Sistema Nacional de Competencias (SNC) es un instrumento del Gobierno Federal que contribuye a la competitividad económica, al desarrollo educativo y al progreso social de México, con base en el fortalecimiento de las competencias de las personas.</p>
            <div className="row">
              <div className="col-lg-4">
                <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />
                <h2 className="fw-normal">Listado de estándares</h2>
                <p>Explora nuestra lista de estándares para obtener información detallada sobre calidad, seguridad y excelencia</p>
                <p><a className="btn btn-secondary" href="#">Descargar</a></p>
              </div>
              <div className="col-lg-4">
                <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />        <h2 className="fw-normal">Ejemplo de certificado del conocer</h2>
                <p>Descubre un ejemplo detallado de certificado del conocer para comprender los estándares de competencia y formación profesional</p>
                <p><a className="btn btn-secondary" href="#">Descargar»</a></p>
              </div>
              <div className="col-lg-4">
                <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />        <h2 className="fw-normal">Requisitos </h2>
                <p>Descubre los requisitos clave para obtener el certificado en estándares de competencias</p>
                <p><a className="btn btn-secondary" href="#">Descargar</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section id="licencias">
        <div className="album py-5 bg-body-tertiary" >
          <div className="container">
            <h1 className="fw-light">Categorias</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

              <div className="col">
                <div className="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />            <div className="card-body">
                    <p className="card-text">Categoria "A" </p>
                    <p className="card-text">Del autotransporte federal y privado de pasaje y turismo.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <a href="#" className="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small className="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />            <div className="card-body">
                    <p className="card-text">Categoria "B" </p>
                    <p className="card-text">Del autotransporte federal y privado de carga general en tractocamión quinta rueda.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <a href="#" className="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small className="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />            <div className="card-body">
                    <p className="card-text">Categoria "C" </p>
                    <p className="card-text">Del autotransporte federal y privado de carga general en camión unitario. </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <a href="#" className="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small className="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />
                  <div className="card-body">
                    <p className="card-text">Categoria "D" </p>
                    <p className="card-text">Para el servicio de autotransporte de pasajeros de turismo en el servicio de chofer guía.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <a href="#" className="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small className="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />
                  <div className="card-body">
                    <p className="card-text">Categoria "E" </p>
                    <p className="card-text">Servicio de autotransporte Doble articulado. Carga de materiales y residuos peligrosos. </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <a href="#" className="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small className="text-body-secondary">230 Horas de Curso</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow-sm">
                  <img src={CATRAImage} alt="Listado de estándares" width="140" height="140" className="rounded-circle" />
                  <div className="card-body">
                    <p className="card-text">Categoria "F" </p>
                    <p className="card-text">Servicio de autotransporte de pasajeros en el servicio de transporte terrestre y hacia los puertos marítimos y aeropuertos. </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <a href="#" className="btn btn-primary my-2">Descargar Informacion</a>
                      </div>
                      <small className="text-body-secondary">230 Horas de Curso</small>
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
