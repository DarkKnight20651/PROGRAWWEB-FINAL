import { useEffect, useState } from 'react';
import axiosClient from '/src/axios-client.jsx';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import Loader from 'src/components/loader';

const RespuestaIndex = () => {
  const [respuestas, setRespuestas] = useState([]);
  const navigate = useNavigate();
  const { preguntaId, examenId } = useParams({ strict: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`pregunta/${preguntaId}/respuestas`);
        console.log(response.data.respuestas);
        setRespuestas(response.data.respuestas);
      } catch (error) {
        console.error("Error al obtener las respuestas:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRespuestas();
  }, [preguntaId]);
  const createRespuesta = async () => {
    await navigate({ to: `/examenes/${examenId}/preguntas/${preguntaId}/respuestas/create` });
  }
  const handleEditRespuesta = async (respuesta) => {
    await navigate({ to: `/examenes/${examenId}/preguntas/${preguntaId}/respuestas/${respuesta.id}/edit` });
  };
  const deleteRespuesta = async (id) => {
    try {
      await axiosClient.delete(`/respuestas/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />
  } else
    return (
      <div className="container mt-4">
        <h1>Respuestas de la Pregunta</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button onClick={createRespuesta} className="btn btn-primary">Nueva Respuesta</button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>Texto</th>
                <th>Imagen</th>
                <th>Es correcta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {respuestas.map(respuesta => (
                <tr key={respuesta.id}>
                  <td>{respuesta.texto}</td>
                  <td>
                    {respuesta.path_imagen ? (
                      <img
                        src={`http://localhost:8000/storage/${respuesta.path_imagen}`}
                        alt="Imagen de la respuesta"
                        className="img-fluid"
                        style={{ maxWidth: '100px', height: 'auto' }}
                      />
                    ) : (
                      <p>No hay imagen disponible</p>
                    )}
                  </td>
                  <td>{respuesta.is_correct ? 'Sí' : 'No'}</td>
                  <td>
                    <button onClick={() => handleEditRespuesta(respuesta)} className="btn btn-warning me-2">Editar</button>
                    <button onClick={() => deleteRespuesta(respuesta.id)} className="btn btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to={`/examenes/${examenId}/preguntas`}><button className='btn'>Regresar</button></Link>
      </div>
    );
};

export default RespuestaIndex;
