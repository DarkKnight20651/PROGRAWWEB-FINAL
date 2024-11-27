import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import axiosClient from 'src/axios-client.jsx';

import 'src/assets/bootstrap.min.css';

const UserManager = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const response = await axiosClient.get('/clientes', { signal: controller.signal });
        setClientes(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
    return () => controller.abort();
  }, []);

  const createUser = async () => {
    await navigate({ to: "/clientes/crear" });
  }
  const handleEditUser = async (curp) => {
    await navigate({ to: `/clientes/editar/${curp}` });
  };

  const deleteUser = async (curp) => {
    try {
      await axiosClient.delete(`/clientes/${curp}`);
      alert("Cliente borrado");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Administración de Clientes</h1>
      <div className="container">
        <div className="d-flex justify-content-end mb-3">
          <button onClick={createUser} className="btn btn-success">
            Nuevo Usuario
          </button>
        </div>
        <table className="table table-bordered table-striped table-responsive">
          <thead>
            <tr>
              <th>CURP</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.curp}>
                <td>{cliente.curp}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>
                  <button
                    onClick={() => handleEditUser(cliente.curp)}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteUser(cliente.curp)}
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
