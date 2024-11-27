import React, { useState, createRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from "/src/contexts/ContextProvider.jsx";
import axiosClient from "/src/axios-client.jsx";
 import './Login.css'
const Login = () => {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate para redireccionar

  const onSubmit = ev => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient.post('/login', payload)
      .then(({ data }) => {
        
        navigate("/users"); 
      })
      .catch((err) => {
        const response = err.response;
        
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-25">
        <h3 className="text-center">Iniciar sesión </h3>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            {message && (
              <div className="alert">
                <p>{message}</p>
              </div>
            )}
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              id="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">contraseña</label>
            <input
              ref={passwordRef}
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="d-grid">
            <button type="button" className="btn-primary" color='red'>
              INGRESAR
            </button>
          </div>
          No registrado aun? <Link to="/signup">Registrarse</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
