  import { Navbar } from '../components';
  import { Footer } from '../containers';
  import '../styles/App.css';
  import './Infocatra.css';

  const Infocatra = () => {
    return (
      <div className="App gradient__bg">
        <div className="gradient__bg">
          <Navbar />
        </div>

        <div className="catra__infocatra__values">
          <div className="catra__infocatra__value">
            <h1 className="historia">Historia</h1>
            <p>
              El Centro de Capacitación y Adiestramiento CATRA S. de R.L. se fundó el 05 de diciembre del 2018 con su respectiva autorización y registro ante la Secretaría de Trabajo y Previsión Social como agente capacitador, obteniendo permiso para operar en mayo de 2019 por parte de la Secretaría de Comunicaciones y Transportes con certificación en ISO 9001:2015 en abril de 2020. Así mismo contrajo convenio de colaboración con el Instituto Tecnológico de Oaxaca en materia de residencias profesionales en agosto de 2020, y en el mismo año forma parte del programa Jóvenes Construyendo el Futuro.
            </p>
            <img src="/path/to/your/image.jpg" alt="Historia" className="catra__infocatra__image" />
          </div>

          <div className="catra__infocatra__value">
            <h1>Política de Calidad</h1>
            <p>
              Brindar capacitaciones para obtener y renovar la licencia federal del conductor, satisfaciendo las necesidades y expectativas de los clientes, proporcionando instructores con conocimientos para impartir las capacitaciones, cumpliendo con los requisitos de la norma ISO 9001:2015 y asegurando una mejora continua en el sistema de gestión de calidad.
            </p>
            <img src="/path/to/your/image.jpg" alt="Política de Calidad" className="catra__infocatra__image" />
          </div>

          <div className="catra__infocatra__value">
            <h1>Misión</h1>
            <p>
              Facilitar el proceso de obtención de licencias federales y ofrecer cursos de capacitación especializados, comprometidos con la eficiencia, seguridad y cumplimiento normativo para empresas y entidades gubernamentales a nivel nacional.
            </p>
            <img src="/path/to/your/image.jpg" alt="Misión" className="catra__infocatra__image" />
          </div>

          <div className="catra__infocatra__value">
            <h1>Visión</h1>
            <p>
              Ser líderes reconocidos en la gestión de trámites de licencias federales y capacitación especializada, promoviendo la excelencia y seguridad en el ámbito laboral y gubernamental, expandiendo nuestra influencia a nivel nacional.
            </p>
            <img src="/path/to/your/image.jpg" alt="Visión" className="catra__infocatra__image" />
          </div>

          <div className="catra__infocatra__value">
            <h1>Política de la Empresa</h1>
            <p>
              Brindar capacitaciones para obtener y renovar la licencia federal del conductor, satisfaciendo las necesidades y expectativas de los clientes, proporcionando instructores con conocimientos para impartir las capacitaciones, cumpliendo con los requisitos de la Norma ISO 9001:2015 y asegurando una mejora continua en el sistema de gestión de calidad.
            </p>
            <img src="/path/to/your/image.jpg" alt="Política de la Empresa" className="catra__infocatra__image" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  export default Infocatra;