import React from 'react';
import catraLogo from '/src/assets/CATRAF.png'

import './footer.css';

const Footer = () => (
  <div className="catra__footer section__padding">
    <div className="catra__footer-heading">
      <h1 className="gradient__text">Quieres estar un paso adelante de los demas </h1>
    </div>

    <div className="catra__footer-btn">
      <p>Request Early Access</p>
    </div>

    <div className="catra__footer-links">
      <div className="catra__footer-links_logo">
        <img src={catraLogo} alt="catra_logo" />
        <p>Brasil 306, Colonia América Sur
        Oaxaca de Juarez,Oaxaca 68104, MX. <br /> Todos los derechos reservados</p>
      </div>
      <div className="catra__footer-links_div">
        <h4>Enlaces</h4>
        <p>Home</p>
        <p>Redes Sociales</p>
        <p>Counters</p>
        <p>Contacto</p>
      </div>
      <div className="catra__footer-links_div">
        <h4>Compañia</h4>
        <p>Termios y condiciones </p>
        <p>Politica de Privacidad </p>
        <p>Contacto</p>
      </div>
      <div className="catra__footer-links_div">
        <h4>Contactanos</h4>
        <p>Crechterwoord K12 182 DK Alknjkcb</p>
        <p>951 124 7422</p>
        <p>catra@gmail.com</p>
      </div>
    </div>

    <div className="catra__footer-copyright">
      <p>@2024 CATRA. Todos los derechos reservados.</p>
    </div>
  </div>
);

export default Footer;