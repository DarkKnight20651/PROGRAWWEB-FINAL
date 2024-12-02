import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import axiosClient from 'src/axios-client.jsx';
import Loader from 'src/components/loader';

const PreguntaIndex = () => {
  const [preguntas, setPreguntas] = useState([]);
  const navigate = useNavigate();
  const { examenId } = useParams({ strict: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`examen/${examenId}/preguntas`);
        setPreguntas(response.data.preguntas);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPreguntas();
  }, [examenId]);

  const createPregunta = async () => {
    await navigate({ to: `/examenes/${examenId}/preguntas/create` });
  }
  const handleEditPregunta = async (pregunta) => {
    await navigate({ to: `/examenes/${examenId}/preguntas/${pregunta.id}/edit` });
  };
  const deletePregunta = async (id) => {
    await axiosClient.delete(`/preguntas/${id}`);
  };

  const handleVerRespuestas = async (id) => {
    await navigate({ to: `/examenes/${examenId}/preguntas/${id}/respuestas` });
  }

  if (isLoading) {
    return <Loader />
  } else
    return (
      <div className="container my-4">
        <h1>Preguntas del Examen</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button onClick={createPregunta} className="btn btn-primary">Nueva Pregunta</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Texto</th>
                <th>ID Examen</th>
                <th>Path Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {preguntas.map(pregunta => (
                <tr key={pregunta.id}>
                  <td>{pregunta.texto}</td>
                  <td>{pregunta.id_examen}</td>
                  <td>
                    {pregunta.path_imagen ? (
                      <img
                        src={`http://localhost:8000/storage/${pregunta.path_imagen}`}
                        alt="Imagen de la pregunta"
                        className="img-fluid"
                        style={{ width: '100px', height: 'auto' }}
                      />
                    ) : (
                      <p>No hay imagen disponible</p>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEditPregunta(pregunta)} className="btn btn-warning btn-sm me-2">Editar</button>
                    <button onClick={() => deletePregunta(pregunta.id)} className="btn btn-danger btn-sm me-2">Eliminar</button>
                    <button onClick={() => handleVerRespuestas(pregunta.id)} className="btn btn-info btn-sm">Ver Respuestas</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to={`/examenes`}><button className='btn'>Regresar</button></Link>
      </div>
    );
};

export default PreguntaIndex;
