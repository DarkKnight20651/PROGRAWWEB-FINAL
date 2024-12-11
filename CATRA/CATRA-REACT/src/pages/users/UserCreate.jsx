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
  const pathRef = createRef();
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (passwordRef.current.value !== password_confirmationRef.current.value) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    const formData = new FormData();
    formData.append('email', emailRef.current.value);
    formData.append('role', roleRef.current.value);
    formData.append('password', passwordRef.current.value);
    formData.append('password_confirmation', password_confirmationRef.current.value);
    if (pathRef.current.files[0]) {
      formData.append('path_imagen', pathRef.current.files[0]);
  }


    try {
      await axiosClient.post('/users', formData);
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
          >a
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
          <label htmlFor="imagen" className="form-label">Cargar Imagen de Perfil</label>
          <input
            ref={pathRef}
            type="file"
            className="form-control"
            id="imagen"
            accept=".jpg, .jpeg, .png"
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