import { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import axiosClient from 'src/axios-client';

const UserEdit = () => {
  const { userId } = useParams({ strict: false });
  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const { data } = await axiosClient.get(`/users/${userId}`, {signal: controller.signal});
        setRole(data.role);
        setEmail(data.email);
      } catch (error) {
        console.log('Error al cargar usuario:', error);
      }
    };

    if (userId) {
      fetchUser();
    }

    return () => controller.abort();
  }, [userId]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const payload = {
      email,
      password,
      password_confirmation: passwordConf,
      role,
    };

    try {
      await axiosClient.put(`/users/${userId}`, payload);
      alert("Usuario creado correctamente");
      await navigate({to: '/usuarios'});
    } catch (err) {
      alert("Error al actualizar el usuario");
      console.log('Error al actualizar usuario:', err);
    }
  };

  const cancelar = async () => {
    await navigate({to: "/usuarios"});
  };

  return (
    <div className="container">
      <h1>Editar Usuario</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-control"
            id="role"
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
            <option value="secre">Secretaria</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Correo Electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ConfPassword" className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="ConfPassword"
            placeholder="Confirmar Contraseña"
            required
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '10px 60px', fontSize: '20px' }}
          >
            Guardar Cambios
          </button>
        </div>
      </form>
      <button onClick={cancelar} className="edit">Cancelar</button>
    </div>
  );
};

export default UserEdit;
