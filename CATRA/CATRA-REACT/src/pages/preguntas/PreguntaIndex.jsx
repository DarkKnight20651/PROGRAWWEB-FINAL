import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import axiosClient from 'src/axios-client.jsx';
import Loader from 'src/components/loader';

const PreguntaIndex = () => {
  const [preguntas, setPreguntas] = useState([]);
  const navigate = useNavigate();
  const { examenId } = useParams({ strict: false });
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPregunta, setEditingPregunta] = useState(null);
  const textoRef = useRef();
  const pathRef = useRef();
  const fetchPreguntas = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(`examen/${examenId}/preguntas`);
      setPreguntas(response.data.preguntas);
      console.log(response.data.preguntas);
    } catch (error) {
      console.error("Error al obtener las preguntas:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

    fetchPreguntas();
  }, [examenId]);
  useEffect(() => {
    if (modalVisible) {
      if (editingPregunta) {
        // Establecer valores para edición
        if (textoRef.current) textoRef.current.value = editingPregunta.texto || '';


      } else {
        // Limpiar los campos para un nuevo examen
        if (textoRef.current) textoRef.current.value = '';


      }
    }
  }, [modalVisible, editingPregunta]);

  const openModal = (pregunta = null) => {
    setEditingPregunta(pregunta);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingPregunta(null);
  };
  const handleSave = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('texto', textoRef.current.value);
    formData.append('id_examen', examenId);
    if (pathRef.current.files[0]) {
      formData.append('path_imagen', pathRef.current.files[0]);
    }
    
    try {
      if (editingPregunta) {
        formData.append('_method', 'PUT')
        await axiosClient.post(`/preguntas/${editingPregunta.id}`, formData);
        alert("Editado");
        fetchPreguntas();
        closeModal();
      }

      else {
        await axiosClient.post('/preguntas', formData);
        alert("Pregunta creada");
        fetchPreguntas();
      }
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePregunta = async (id) => {
    await axiosClient.delete(`/preguntas/${id}`);
    fetchPreguntas();
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
          <button onClick={() => openModal()} className="btn btn-primary">
            Crear Pregunta
          </button>
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
                    <button onClick={() => openModal(pregunta)} className="btn btn-warning btn-sm me-2">
                      Editar
                    </button>
                    <button onClick={() => deletePregunta(pregunta.id)} className="btn btn-danger btn-sm me-2">
                      Eliminar
                    </button>
                    <button onClick={() => handleVerRespuestas(pregunta.id)} className="btn btn-info btn-sm">
                      Ver Respuestas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to={`/examenes`}><button className='btn'>Regresar</button></Link>
        {modalVisible && (
          <div className="modal" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingPregunta ? 'Editar Examen' : 'Nueva Pregunta'}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSave}>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Texto de la Pregunta</label>
                      <input ref={textoRef} type="text" className="form-control" id="nombre" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="imagen" className="form-label">Cargar Imagen para la pregunta (opcional)</label>
                      <input
                        ref={pathRef}
                        type="file"
                        className="form-control"
                        id="imagen"
                        accept=".jpg, .jpeg, .png"
                      />
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

export default PreguntaIndex;
