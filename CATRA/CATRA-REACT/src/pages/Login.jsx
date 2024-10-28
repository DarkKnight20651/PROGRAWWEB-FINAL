import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    
    
  };

  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100" >
      <div className="card p-4 w-25" >
        <h3 className="text-center">INICIAR SESIÓN</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">DIRECCIÓN DE CORREO</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="INGRESA EMAIL"
                  />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">CONTRASEÑA</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="CONTRASEÑA"
           />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              INGRESAR
            </button>
           
          </div>
          No registrado aun? <Link to ="/signup">Registrarse</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
