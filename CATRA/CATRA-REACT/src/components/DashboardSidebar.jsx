import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, Nav } from 'react-bootstrap';

const Sidebar = ({ routes }) => {
  return (
    <Card className="border-0" style={{ height: '100vh', width: '350px', padding: '10px', backgroundColor: '#f8f9fa' }}>
      <Card.Body>
        <h3>Dashboard</h3>
        <Nav className="flex-column">
          {routes.map((route) => (
            <Nav.Item key={route.path}>
              <Link to={route.path} className="nav-link">
                {route.name}
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
