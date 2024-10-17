import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

function Instructors() {
  return (
    <Container className="mt-4">
      <h1>Gestión de Instructores</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>María López</td>
            <td>Capacitación en manejo seguro</td>
            <td><Button variant="primary">Ver detalles</Button></td>
          </tr>
          {/* Agrega más instructores aquí */}
        </tbody>
      </Table>
    </Container>
  );
}

export default Instructors;
