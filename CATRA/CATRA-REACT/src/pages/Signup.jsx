import React, { useState,createRef } from 'react';
import { Link } from 'react-router-dom';
import {useStateContext} from "/src/contexts/ContextProvider.jsx";
import axiosClient from "/src/axios-client.jsx"

const Signup = () => {
  const nameRef = createRef()
  const apep = createRef()
  const apem = createRef()
  const birth = createRef()
  const emailRef = createRef()
  const tel = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)
  

  const onSubmit = ev => {
    ev.preventDefault();
    // Aquí puedes manejar la lógica de autenticación
    const payload = {
        name: nameRef.current.value,
        apellidop: apep.current.value,
        apellidom: apem.current.value,
        dateBirth: birth.current.value,
        email: emailRef.current.value,
        tel: tel.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      }
      axiosClient.post('/signup', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token);
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
  };

  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 w-50"> 
      <h3 className="text-center">Registrarse</h3><br></br>
      <form onSubmit={onSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input ref={nameRef}
              type="text"
              className="form-control"
              id="name"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="col">
            <label htmlFor="apep" className="form-label">APELLIDO PATERNO</label>
            <input ref={apep}
              type="text"
              className="form-control"
              id="apep"
              placeholder="Ingresa tu apellido"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="nombre" className="form-label">APELLIDO MATERNO</label>
            <input ref={apem}
              type="text"
              className="form-control"
              id="apem"
              placeholder="Ingresa tu apellido materno"
            />
          </div>
          <div className="col">
            <label htmlFor="fechanac" className="form-label">FECHA DE NACIMIENTO</label>
            <input ref={birth}
              type="date"
              className="form-control"
              id="fechanac"
              placeholder="Ingresa tu fecha de nacimiento"
            />
          </div>
        </div>
        <div className="row mb-3">
        <div className="col">
          <label htmlFor="email" className="form-label">DIRECCIÓN DE CORREO</label>
          <input ref={emailRef}
            type="email"
            className="form-control"
            id="email"
            
            placeholder="INGRESA EMAIL"
          /></div>
          <div className="col">
          <label htmlFor="tel" className="form-label">NÚMERO DE TELÉFONO</label>
          <input ref={tel}
            type="tel"
            className="form-control"
            id="tel"
            
            placeholder="INGRESA EMAIL"
          />
          </div>
        </div>
        <div className="row mb-3">
        <div className="col">
          <label htmlFor="password" className="form-label">CONTRASEÑA</label>
          <input ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
            
            placeholder="CONTRASEÑA"
          />
        </div>
        <div className="col">
          <label htmlFor="repassword" className="form-label">CONFIRMAR CONTRASEÑA</label>
          <input ref={passwordConfirmationRef}
            type="password"
            className="form-control"
            id="repassword"
           
            placeholder="CONFIRMAR CONTRASEÑA"
          />
        </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            REGISTRARSE
          </button>
          
        </div>
        Ya estás registrado? <Link to="/login">Iniciar Sesión</Link>
      </form>
    </div>
  </div>
  
  );
};

export default Signup;
