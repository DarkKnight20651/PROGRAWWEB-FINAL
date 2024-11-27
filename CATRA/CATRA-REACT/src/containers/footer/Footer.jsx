import catraLogo from '/src/assets/CATRAF.png'

import './footer.css';

import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <div className="catra__footer section__padding">
   

    <div className="catra__footer-links">
      <div className="catra__footer-links_logo">
        <img src={catraLogo} alt="catra_logo" />
        <p id='text1'>Brasil 306, Colonia América Sur
          Oaxaca de Juarez,Oaxaca 68104, MX. <br /> Todos los derechos reservados</p>
      </div>
      <div className="catra__footer-links_div">
        <h4>Enlaces</h4>
        <p>Home</p>
        <p>Iniciar sesion</p>
        <p>Registrarse</p>
        <p>¿Que es catra ?</p>
        <p>¿Nuestros Servicios ?</p>
        <p>Instalaciones</p>

      </div>
      <div className="catra__footer-links_div">
        <h4>Compañia</h4>
        <p>Termios y condiciones </p>
        <p>Politica de Privacidad </p>
        <p>Contacto</p>
      </div>
      <div className="catra__footer-links_div">
        <h4>Contactanos</h4>
        <p>Brasil 306, Colonia América Sur
        Oaxaca de Juarez,Oaxaca 68104, MX</p>
        <p>951 124 7422</p>
        <p>catra@gmail.com</p>
        
      </div>

      <div className="catra__footer-links_div">
        <h4>Redes Sociales</h4>
        <p><a href="https://www.facebook.com/CatraLicenciasFederalesOaxaca" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a></p>
        <p><a href="https://www.instagram.com/catra_centrodecapacitacion/" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></p>
      </div>
    </div>

    <div className="catra__footer-copyright">
      <p>@2024 CATRA. Todos los derechos reservados.</p>
    </div>
  </div>
);

export default Footer;