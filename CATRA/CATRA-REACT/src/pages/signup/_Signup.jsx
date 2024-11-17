import React, { useState, createRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from "/src/contexts/ContextProvider.jsx";
import axiosClient from "/src/axios-client.jsx";
import './Signup.css';

const Signup = () => {
  const nameRef = createRef();
  const apep = createRef();
  const apem = createRef();
  const birth = createRef();
  const emailRef = createRef();
  const tel = createRef();
  const genderRef = createRef();
  const passwordRef = createRef();
  const curpRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const onSubmit = ev => {
    ev.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);

    const payload1 = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      role: 'cliente',
    };

    axiosClient.post('/signup', payload1)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        const payload = {
          nombre: nameRef.current.value,
          ape_p: apep.current.value,
          ape_m: apem.current.value,
          fecha_nac: birth.current.value,
          genero: genderRef.current.value,
          telefono: tel.current.value,
          id_direccion: 1,
          id_user: data.user.id,
          curp: curpRef.current.value
        };
        axiosClient.post('/clientes', payload)
          .then(({ data }) => {
            navigate("/users");
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors);
            }
          });
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h1 className="text-center">Registrarse</h1>
        <p className="text-center">Los campos con * son obligatorios</p>
        <br />
        <form onSubmit={onSubmit}>
          {/* Personal Information Section */}
          <div className="section">
            <h3 className="subtitle">Información Personal</h3>
            <br />
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="nombre" className="form-label">Nombre *</label>
                <input ref={nameRef}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ingresa tu nombre"
                  required
                  maxLength="50"
                />
              </div>
              <div className="col">
                <label htmlFor="apep" className="form-label">Apellido Paterno *</label>
                <input ref={apep}
                  type="text"
                  className="form-control"
                  id="apep"
                  placeholder="Ingresa tu apellido"
                  required
                  maxLength="50"
                />
              </div>
              <div className="col">
                <label htmlFor="apem" className="form-label">Apellido Materno *</label>
                <input ref={apem}
                  type="text"
                  className="form-control"
                  id="apem"
                  placeholder="Ingresa tu apellido materno"
                  required
                  maxLength="50"
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="curp" className="form-label">Cur *</label>
                  <input ref={curpRef}
                    type="text"
                    className="form-control"
                    id="curp"
                    placeholder="Ingresa tu curp"
                    required
                    pattern="[A-Z0-9]{18}"
                  />
                </div>
                <div className="col">
                  <label htmlFor="fechanac" className="form-label">Fecha de Nacimiento *</label>
                  <input ref={birth}
                    type="date"
                    className="form-control"
                    id="fechanac"
                    placeholder="Ingresa tu fecha de nacimiento"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="genero" className="form-label">Género *</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        ref={genderRef}
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        id="masculino"
                        value="1"
                        required
                      />
                      <label className="form-check-label" htmlFor="masculino">
                        Masculino
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        ref={genderRef}
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        id="femenino"
                        value="0"
                        required
                      />
                      <label className="form-check-label" htmlFor="femenino">
                        Femenino
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* Contact Information Section */}
          <div className="section">
            <h3 className="subtitle">Información de Contacto</h3>
            <br />
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="email" className="form-label">Dirección de Correo *</label>
                <input ref={emailRef}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="tel" className="form-label">Número de Teléfono *</label>
                <input ref={tel}
                  type="text"
                  className="form-control"
                  id="tel"
                  placeholder="Ingresa tu número de teléfono"
                  required
                />
              </div>
            </div>
          </div>
          <br />
          {/* Account Credentials Section */}
          <div className="section">
            <h3 className="subtitle">Seguridad</h3>
            <br />
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="password" className="form-label">Contraseña *</label>
                <input ref={passwordRef}
                  type="password"
                  className={`form-control ${passwordMismatch ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  required
                  minLength="8"
                />
              </div>
              <div className="col">
                <label htmlFor="repassword" className="form-label">Confirmar Contraseña *</label>
                <input ref={passwordConfirmationRef}
                  type="password"
                  className={`form-control ${passwordMismatch ? 'is-invalid' : ''}`}
                  id="repassword"
                  placeholder="Confirma tu contraseña"
                  required
                  minLength="8"
                />
                {passwordMismatch && <div className="invalid-feedback">Las contraseñas no coinciden.</div>}
              </div>
            </div>
          </div>
          {/* Submit Button Section */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>
          <div>
            ¿Ya estás registrado? <Link to="/login">Iniciar Sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;