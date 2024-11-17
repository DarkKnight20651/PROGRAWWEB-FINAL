import './header.css'
import truckf from '/src/assets/truckf.png'

const header = () => {
  return (
    <div className='catra__header section__padding' id='home'>
      <div className='catra__header-content'>
        <h1 className='gradient__text'>Centro de Capacitación CATRA S. de R.L.</h1>
        <h2 className='info-text'>Somos una institución líder en el entrenamiento y certificación para la obtención de licencias federales de autotransporte.</h2><br></br>
        <div className='catra__header-content_input'>
        </div>        
      </div>
      <div className='catra__header-image'>
          <img src={truckf} alt='truckf' />
        </div>
    </div>
  )
}

export default header
