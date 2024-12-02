import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useNavigate } from '@tanstack/react-router';

import 'src/assets/bootstrap.min.css'
import Loader from 'src/components/loader';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let signalError = false;
    (async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get('/users', { signal: controller.signal });
        setUsers(response.data);
      } catch (err) {
        if (err.code === "ERR_CANCELED") signalError = true;
        console.log(err);
      } finally {
        if (!signalError) setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const createUser = async () => {
    await navigate({ to: "/usuarios/crear" });
  }
  const handleEditUser = async (user) => {
    await navigate({ to: `/usuarios/editar/${user.id}` });
  };

  const deleteUser = async (id) => {
    try {
      await axiosClient.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log("Error al eliminar el usuario", error);
    }
  };
  if (isLoading) {
    return <Loader />
  } else
    return (
      <div>
        <h1 className="text-center mb-4">Administración de Usuarios</h1>
        <div className="container">
          <div className="d-flex justify-content-end mb-3">
            <button onClick={createUser} className="btn btn-success">
              Nuevo Usuario
            </button>
          </div>
          <table className="table table-bordered table-striped table-responsive">
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
                    <button
                      onClick={() => handleEditUser(user)}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
};

export default UserManager;
