import '../../styles/index.css'
import './feature.css'
const feature = ({ title, text }) => {
  return (
    <div className='catra__features-container__feature'>
      <div className='catra__features-container__feature-title'>
        <div />

        <h1>{title}</h1>
      </div>

      <div className='catra__features-container__feautre-text'>
        {text}
      </div>


    </div>
  )
}

export default feature
