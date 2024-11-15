import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const Downloads = () => {
  // URLs de archivos de ejemplo
  const files = [
    { name: 'Formato Asistencia', url: '/path/to/file1.pdf' },
    { name: 'Archivo 2', url: '/path/to/file2.pdf' },
    { name: 'Archivo 3', url: '/path/to/file3.pdf' },
    { name: 'Archivo 4', url: '/path/to/file4.pdf' },
  ];

  return (
    <>
      <div className="App gradient__bg">
        

        
        
      </div>
      
      <Container className="mt-5">
        <h2 className="text-center mb-4">Descargar Archivos</h2>
        <Row className="justify-content-center">
          {files.map((file, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>{file.name}</Card.Title>
                  <Button 
                    variant="primary" 
                    href={file.url} 
                    download 
                    target="_blank"
                  >
                    Descargar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
    </>
  );
}

export default Downloads;
