import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

function Students() {
  return (
    <Container className="mt-4">
      <h1>Gestión de Estudiantes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Progreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Juan Pérez</td>
            <td>INE, CURP</td>
            <td>75%</td>
            <td><Button variant="primary">Ver detalles</Button></td>
          </tr>
          {/* Agrega más estudiantes aquí */}
        </tbody>
      </Table>
    </Container>
  );
}

export default Students;
