import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
 // Archivo CSS para estilos personalizados
 import {useEffect} from "react";
 import axiosClient from "/src/axios-client.jsx";
 import {useStateContext} from "/src/contexts/ContextProvider.jsx";
 
function Home() {
  const {user, token, setUser, setToken, notification} = useStateContext();
  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
         
      })
  }, [])
  return (
    <div>
      {/* Barra de navegación */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/logo.png" // Ruta de tu logo
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            />
            CATRA
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
              <Nav.Link href="#about">¿Qué es CATRA?</Nav.Link>
              <Nav.Link href="#services">Nuestros servicios</Nav.Link>
              <Nav.Link href="#contact">Contacto</Nav.Link>
              <Nav.Link href="#comments">Comentarios</Nav.Link>
              <button type="button" onClick={onLogout} className="btn btn-primary">
            Log out
          </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Banner de bienvenida */}
      <div className="banner">
        <div className="overlay">
          <Container>
            <h1 className="display-4">Bienvenido a CATRA</h1>
            <p className="lead">"NUESTRA EMPRESA"</p>
            <p className="description">
              El Centro de Capacitación CATRA S. de R.L. es un destacado centro
              especializado en la obtención de licencias federales de
              autotransporte. Reconocido por la SEP y el CONOCER como Centro de
              Evaluación, y autorizado por la STPS para la impartición de
              capacitación en esta área específica.
            </p>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Home;
