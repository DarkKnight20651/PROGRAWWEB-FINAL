import { createRef } from 'react';
import { useNavigate } from '@tanstack/react-router';

import axiosClient from "/src/axios-client.jsx";
import './UserCreate.css'

const UserCreate = () => {
  const navigate = useNavigate();

  const emailRef = createRef();
  const passwordRef = createRef();
  const password_confirmationRef = createRef();
  const roleRef = createRef();

  const onSubmit = async (ev) => {
    ev.preventDefault();

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
          <label htmlFor="role" className="form-label">Rol</label>
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
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            ref={emailRef}
            type="text"
            className="form-control"
            id="email"
            placeholder="Correo Electrónico"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
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
          <label htmlFor="ConfPassword" className="form-label">Confirmar Contraseña</label>
          <input
            ref={password_confirmationRef}
            type="password"
            className="form-control"
            id="ConfPassword"
            placeholder="Confirmar Contraseña"
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '10px 60px', fontSize: '25px' }}
          >
            Crear
          </button>
          <button onClick={cancelar} className="edit" >Cancelar</button>
        </div>
      </form>
    </div>
  );
}
export default UserCreate;