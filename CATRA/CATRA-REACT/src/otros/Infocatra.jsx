import { Navbar } from '../components'
import { Footer } from '../containers'
import '../styles/App.css'
import './Infocatra.css'

const Infocatra = () => {
  return (
    <div className="App gradient__bg">
      <div className="gradient__bg">
        <Navbar />
      </div>

      <div className="catra__infocatra__values">
        <div className="catra__infocatra__value">
          <h2>Misión</h2>
          <p>Facilitar el proceso de obtención de licencias federales y ofrecer cursos de capacitación especializados, comprometidos con la eficiencia, seguridad y cumplimiento normativo para empresas y entidades gubernamentales a nivel nacional.</p>
        </div>
        <div className="catra__infocatra__value">
          <h2>Visión</h2>
          <p>Ser líderes reconocidos en la gestión de trámites de licencias federales y capacitación especializada, promoviendo la excelencia y seguridad en el ámbito laboral y gubernamental, expandiendo nuestra influencia a nivel nacional.</p>
        </div>
        <div className="catra__infocatra__value">
          <h2>Política de la Empresa</h2>
          <p>Brindar capacitaciones para obtener y renovar la licencia federal del conductor, satisfaciendo las necesidades y expectativas de los clientes, proporcionando instructores con conocimientos para impartir las capacitaciones, cumpliendo con los requisitos de la Norma ISO 9001:2015 y asegurando una mejora continua en el sistema de gestión de calidad.</p>
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default Infocatra
