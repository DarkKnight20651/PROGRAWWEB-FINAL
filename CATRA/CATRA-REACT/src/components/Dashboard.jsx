import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Dashboard() {
  return (
    <div className="dashboard bg-dark text-white vh-100 p-4">
      <h2>Sistema de Capacitación</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/" className="text-white">Inicio</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/students" className="text-white">Estudiantes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/instructors" className="text-white">Instructores</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/schedule" className="text-white">Horario</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Dashboard;
