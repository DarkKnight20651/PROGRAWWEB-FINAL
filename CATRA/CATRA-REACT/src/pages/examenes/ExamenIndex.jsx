import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import axiosClient from 'src/axios-client.jsx';
import Loader from 'src/components/loader';

const ExamenIndex = () => {
  const [examenes, setExamenes] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExamenes = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get('/examenes');
        setExamenes(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExamenes();
  }, []);
  const createExamen = async () => {
    await navigate({ to: "/examenes/create" });
  }

  const handleEditExamen = async (examen) => {
    await navigate({ to: `/examenes/${examen.id}/edit` });
  };
  const deleteExamen = async (id) => {
    await axiosClient.delete(`/examenes/${id}`);
    alert("Examen eliminado");
  };
  const handleVerPreguntas = async (id) => {
    await navigate({ to: `/examenes/${id}/preguntas` });
  }

  if (isLoading) {
    return <Loader />
  } else
    return (
      <div className="container my-4">
        <h1>Exámenes Disponibles</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button onClick={createExamen} className="btn btn-primary">Nuevo Examen</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Tipo de Evaluación</th>
                <th>Categoría del curso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {examenes.map(examen => (
                <tr key={examen.id}>
                  <td>{examen.nombre}</td>
                  <td>{examen.descripcion}</td>
                  <td>{examen.tipo}</td>
                  <td>{examen.tipo_licencia}</td>
                  <td>
                    <button onClick={() => handleEditExamen(examen)} className="btn btn-warning btn-sm me-2">Editar</button>
                    <button onClick={() => deleteExamen(examen.id)} className="btn btn-danger btn-sm me-2">Eliminar</button>
                    <button onClick={() => handleVerPreguntas(examen.id)} className="btn btn-info btn-sm">Ver Preguntas</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ExamenIndex;
