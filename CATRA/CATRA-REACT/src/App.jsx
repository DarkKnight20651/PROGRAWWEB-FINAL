import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Instructors from './pages/Instructors';
import Schedule from './pages/Schedule';
import Dashboard from './components/Dashboard';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App d-flex">
        {/* Barra lateral (Dashboard) */}
        <Dashboard />
        
        {/* Contenedor principal para las rutas */}
        <div className="main-content container-fluid p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
