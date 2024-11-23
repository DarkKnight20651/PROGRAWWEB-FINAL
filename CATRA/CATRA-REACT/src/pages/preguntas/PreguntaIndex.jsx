import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import axiosClient from 'src/axios-client.jsx';

const PreguntaIndex = () => {
  const [preguntas, setPreguntas] = useState([]);
  const navigate = useNavigate();
  const { examenId } = useParams({ strict: false });

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axiosClient.get(`examen/${examenId}/preguntas`);
        console.log(response.data.preguntas);
        setPreguntas(response.data.preguntas);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error.response?.data || error.message);
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
                  {pregunta.imagen_url ? (
                    <img
                      src={pregunta.imagen_url}
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
    </div>
  );
};

export default PreguntaIndex;
