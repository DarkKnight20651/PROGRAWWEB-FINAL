import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import axiosClient from 'src/axios-client.jsx';
import Loader from 'src/components/loader';

const RespuestaIndex = () => {
  const [respuestas, setRespuestas] = useState([]);
  const navigate = useNavigate();
  const { preguntaId, examenId } = useParams({ strict: false });
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRespuesta, setEditingRespuesta] = useState(null);
  const textoRef = useRef();
  const pathRef = useRef();
  const correctRef = useRef();
  const fetchRespuestas = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(`pregunta/${preguntaId}/respuestas`);
      setRespuestas(response.data.respuestas);
      console.log(response.data.respuestas);
    } catch (error) {
      console.error("Error al obtener las respuestas:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

    fetchRespuestas();
  }, [preguntaId]);
  useEffect(() => {
    if (modalVisible) {
      if (editingRespuesta) {
        // Establecer valores para edición
        if (textoRef.current) textoRef.current.value = editingRespuesta.texto || '';
        if (correctRef.current) correctRef.current.value = editingRespuesta.is_correct || '';

      } else {
        // Limpiar los campos para un nuevo examen
        if (textoRef.current) textoRef.current.value = '';
        if (correctRef.current) correctRef.current.value = '';


      }
    }
  }, [modalVisible, editingRespuesta]);

  const openModal = (respuesta = null) => {
    setEditingRespuesta(respuesta);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingRespuesta(null);
  };
  const handleSave = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('texto', textoRef.current.value);
    formData.append('is_correct', correctRef.current.value);
    formData.append('id_pregunta', preguntaId);
    if (pathRef.current.files[0]) {
      formData.append('path_imagen', pathRef.current.files[0]);
    }

    try {
      if (editingRespuesta) {
        formData.append('_method', 'PUT')
        await axiosClient.post(`/respuestas/${editingRespuesta.id}`, formData);
        alert("Editado");
        fetchRespuestas();
        closeModal();
      }

      else {
        await axiosClient.post('/respuestas', formData);
        alert("Respuesta creada");
        fetchRespuestas();
      }
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteRespuesta = async (id) => {
    await axiosClient.delete(`/respuestas/${id}`);
    fetchRespuestas();
  };



  if (isLoading) {
    return <Loader />
  } else
    return (
      <div className="containe my-4">
        <h1>Respuestas de la Pregunta</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button onClick={() => openModal()} className="btn btn-primary">
            Crear Respuesta
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Texto</th>
                <th>ID Pregunta</th>
                <th>Path Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {respuestas.map(respuesta => (
                <tr key={respuesta.id}>
                  <td>{respuesta.texto}</td>
                  <td>{respuesta.id_pregunta}</td>
                  <td>
                    {respuesta.path_imagen ? (
                      <img
                        src={`http://localhost:8000/storage/${respuesta.path_imagen}`}
                        alt="Imagen de la respuesta"
                        className="img-fluid"
                        style={{ width: '100px', height: 'auto' }}
                      />
                    ) : (
                      <p>No hay imagen disponible</p>
                    )}
                  </td>
                  <td>
                    <button onClick={() => openModal(respuesta)} className="btn btn-warning btn-sm me-2">
                      Editar
                    </button>
                    <button onClick={() => deleteRespuesta(respuesta.id)} className="btn btn-danger btn-sm me-2">
                      Eliminar
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to={`/examenes/${examenId}/preguntas`}><button className='btn'>Regresar</button></Link>
        {modalVisible && (
          <div className="modal" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingRespuesta ? 'Editar Examen' : 'Nueva Respuesta'}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSave}>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Texto de la Respuesta</label>
                      <input ref={textoRef} type="text" className="form-control" id="nombre" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="imagen" className="form-label">Cargar Imagen para la Respuesta (opcional)</label>
                      <input
                        ref={pathRef}
                        type="file"
                        className="form-control"
                        id="imagen"
                        accept=".jpg, .jpeg, .png"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="iscorrect" className="form-label">Esta respuesta es correcta?</label>
                      <select
                        ref={correctRef}
                        className="form-control"
                        id="iscorrect"
                        required
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="1">Si</option>
                        <option value="0">No</option>
                      </select>
                    </div>



                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary me-2">Guardar</button>
                      <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default RespuestaIndex;
