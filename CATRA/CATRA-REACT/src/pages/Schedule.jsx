import React from 'react';
import { Container, Table } from 'react-bootstrap';

function Schedule() {
  return (
    <Container className="mt-4">
      <h1>Programación de Clases</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Instructor</th>
            <th>Estudiantes</th>
            <th>Clase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12/10/2024</td>
            <td>María López</td>
            <td>Juan Pérez, Ana Gómez</td>
            <td>Manejo Seguro de Camiones</td>
          </tr>
          {/* Más clases */}
        </tbody>
      </Table>
    </Container>
  );
}

export default Schedule;
