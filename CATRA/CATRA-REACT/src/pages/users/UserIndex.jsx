import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useNavigate } from '@tanstack/react-router';

import 'src/styles/index.css'
import 'src/assets/bootstrap.min.css'
import 'src/styles/styles.css'

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      const response = await axiosClient.get('/users', {signal: controller.signal});
      setUsers(response.data);
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  const createUser = () => {
    navigate({ to: "/usuarios/crear" });
  }
  const handleEditUser = (user) => {
    navigate({ to: `/usuarios/editar/${user.id}` });
  };
  const deleteUser = async (id) => {
    try {
      await axiosClient.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log("Error al eliminar el usuario", error);
    }
  };

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <div className="container">
        <button onClick={createUser} className="edit">Nuevo Usuario</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Rol</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEditUser(user)} className="edit">Editar</button>
                  <button onClick={() => deleteUser(user.id)} className="delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
