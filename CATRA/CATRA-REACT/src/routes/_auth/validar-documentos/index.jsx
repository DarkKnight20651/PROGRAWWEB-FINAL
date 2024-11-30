import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import axiosClient from 'src/axios-client';

import 'src/assets/bootstrap.min.css';
import Loader from 'src/components/loader';

export const Route = createFileRoute('/_auth/validar-documentos/')({
  component: IndiceClientes,
})

function IndiceClientes() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let signalError = false;
    (async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get('/clientes', { signal: controller.signal });
        setClientes(response.data);
      } catch (err) {
        if (err.code === "ERR_CANCELED") signalError = true;
        console.log(err);
      } finally {
        if (!signalError) setIsLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const handleRevisarDocumentos = async (userId) => {
    await navigate({ to: `/validar-documentos/${userId}` });
  };

  if (isLoading) {
    return <Loader />
  } else
    return (
      <div>
        <h1 className="text-center mb-4">Lista de clientes para revisión de documentos</h1>
        <div className="container">
          <table className="table table-bordered table-striped table-responsive">
            <thead>
              <tr>
                <th>CURP</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Acción</th>
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
                      onClick={() => handleRevisarDocumentos(cliente.user.id)}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Revisar documentos
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


