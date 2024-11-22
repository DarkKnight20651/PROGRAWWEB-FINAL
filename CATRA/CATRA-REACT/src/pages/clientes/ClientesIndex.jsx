import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import axiosClient from '/src/axios-client.jsx';
import { Navbar2 } from '/src/components'

import '../../assets/bootstrap.min.css'
import '../../styles/styles.css'
import '../../styles/index.css'

const UserManager = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const response = await axiosClient.get('/clientes', { signal: controller.signal });
        setClientes(response.data);
      } catch(err) {
        console.log(err);
      }
    })();
    return () => controller.abort();
  }, []);

  const createUser = async() => {
    await navigate({to: "/clientes/crear"});
  }
  const handleEditUser = async(curp) => {
    await navigate({to: `/clientes/editar/${curp}`});
  };
  
  const deleteUser = async (curp) => {
    try {
      await axiosClient.delete(`/clientes/${curp}`);
      alert("Cliente borrado");
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar2 />
      <div>
        <h1>Administración de Clientes</h1>
        <div className="container">
          <button onClick={createUser} className="edit">Nuevo Usuario</button>
          <table>
            <thead>
              <tr>
                <th>Curp</th>
                <th>Nombre</th>
                <th>Telefono</th>
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
                    <button onClick={() => handleEditUser(cliente.curp)} className="edit">Editar</button>
                    <button onClick={() => deleteUser(cliente.curp)} className="delete">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManager;
