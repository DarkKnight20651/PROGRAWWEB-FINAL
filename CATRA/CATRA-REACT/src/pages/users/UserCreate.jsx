import { createRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import axiosClient from "/src/axios-client.jsx";
import './UserCreate.css'

const UserCreate = () => {
  const navigate = useNavigate();

  const emailRef = createRef();
  const passwordRef = createRef();
  const password_confirmationRef = createRef();
  const roleRef = createRef();
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (passwordRef.current.value !== password_confirmationRef.current.value) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    const payload = {
      email: emailRef.current.value,
      role: roleRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
    };

    try {
      await axiosClient.post('/users', payload);
      alert("Usuario creado correctamente");
      await navigate({ to: "/usuarios" });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelar = async () => {
    await navigate({ to: "/usuarios" });
  }

  return (
    <div className="container">
      <h1 className="titulo" id="titulo">Crear nuevo usuario</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rol <span className="text-danger">*</span></label>
          <select
            ref={roleRef}
            className="form-control"
            id="role"
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Admin</option>
            <option value="secre">Secretaria</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo <span className="text-danger">*</span></label>
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="email"
            placeholder="Correo Electrónico"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña <span className="text-danger">*</span></label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ConfPassword" className="form-label">Confirmar Contraseña <span className="text-danger">*</span></label>
          <input
            ref={password_confirmationRef}
            type="password"
            className={`form-control ${passwordMismatch ? 'is-invalid' : ''}`}
            id="ConfPassword"
            placeholder="Confirmar Contraseña"
            required
          />
          {passwordMismatch && <div className="error-message">Las contraseñas no coinciden</div>}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Crear
          </button>
          <button onClick={cancelar} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
export default UserCreate;