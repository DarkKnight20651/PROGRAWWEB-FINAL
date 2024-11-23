import { useEffect, useState } from 'react';
import axiosClient from '/src/axios-client.jsx';
import { useNavigate, useParams } from '@tanstack/react-router';

const RespuestaIndex = () => {
  const [respuestas, setRespuestas] = useState([]);
  const navigate = useNavigate();
  const { preguntaId, examenId } = useParams({ strict: false });

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const response = await axiosClient.get(`pregunta/${preguntaId}/respuestas`);
        console.log(response.data.respuestas);
        setRespuestas(response.data.respuestas);
      } catch (error) {
        console.error("Error al obtener las respuestas:", error.response?.data || error.message);
      }
    };
    fetchRespuestas();
  }, [preguntaId]);
  const createRespuesta = async () => {
    await navigate({ to: `/examenes/${examenId}/preguntas/${preguntaId}/respuestas/create` });
  }
  const handleEditRespuesta = async (respuesta) => {
    await navigate({ to: `/examenes/${examenId}/preguntas/${preguntaId}/respuestas/${respuesta.id}/edit}` });
  };
  const deleteRespuesta = async (id) => {
    try {
      await axiosClient.delete(`/respuestas/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Respuestas de la Pregunta</h1>
      <div className="container">
        <button onClick={createRespuesta} className="edit">Nueva Respuesta</button>
        <table>
          <thead>
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
                <td> {respuesta.imagen_url ? (
                  <img
                    src={respuesta.imagen_url}
                    alt="Imagen de la respuesta"
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : (
                  <p>No hay imagen disponible</p>
                )}</td>
                <td>{respuesta.is_correct}</td>
                <td>
                  <button onClick={() => handleEditRespuesta(respuesta)} className="edit">Editar</button>
                  <button onClick={() => deleteRespuesta(respuesta.id)} className="delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RespuestaIndex;
