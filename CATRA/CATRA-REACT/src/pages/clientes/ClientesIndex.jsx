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

  const fetchClientes = async () => {
    const response = await axiosClient.get('/clientes');
    setClientes(response.data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);
  const createUser = () => {
    navigate({to: "/clientes/crear"});
  }
  /* const handleEditUser = (cliente) => {
    navigate(`/clientes/editar/${cliente.curp}`);
  }; */
  
  const deleteUser = async (curp) => {
    await axiosClient.delete(`/clientes/${curp}`);
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
                    {/* <button onClick={() => handleEditUser(cliente)} className="edit">Editar</button> */}
                    <button onClick={() => deleteUser(cliente.curp)} className="delete">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div></>
  );
};

export default UserManager;
