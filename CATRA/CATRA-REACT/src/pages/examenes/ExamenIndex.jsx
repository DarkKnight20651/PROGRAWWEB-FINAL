import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import axiosClient from 'src/axios-client.jsx';
import Loader from 'src/components/loader';
import 'src/pages/examenes/ExamenIndex.css';
const ExamenIndex = () => {
  const [examenes, setExamenes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExamen, setEditingExamen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const nombreRef = useRef();
  const descRef = useRef();
  const tipoRef = useRef();
  const tipoLicenciaRef = useRef();
  const duraRef = useRef();

  const navigate = useNavigate();
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
  useEffect(() => {
    
    fetchExamenes();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      if (editingExamen) {
        // Establecer valores para edición
        if (nombreRef.current) nombreRef.current.value = editingExamen.nombre || '';
        if (descRef.current) descRef.current.value = editingExamen.descripcion || '';
        if (tipoRef.current) tipoRef.current.value = editingExamen.tipo || '';
        if (tipoLicenciaRef.current) tipoLicenciaRef.current.value = editingExamen.tipo_licencia || '';
        if (duraRef.current) duraRef.current.value = editingExamen.duracion || '';
      } else {
        // Limpiar los campos para un nuevo examen
        if (nombreRef.current) nombreRef.current.value = '';
        if (descRef.current) descRef.current.value = '';
        if (tipoRef.current) tipoRef.current.value = '';
        if (tipoLicenciaRef.current) tipoLicenciaRef.current.value = '';
        if (duraRef.current) duraRef.current.value = '';
      }
    }
  }, [modalVisible, editingExamen]);

  const openModal = (examen = null) => {
    setEditingExamen(examen);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingExamen(null);
  };

  const handleSave = async (ev) => {
    ev.preventDefault();

    const payload = {
      nombre: nombreRef.current?.value,
      descripcion: descRef.current?.value,
      tipo: tipoRef.current?.value,
      tipo_licencia: tipoLicenciaRef.current?.value,
      duracion: duraRef.current?.value,
    };

    try {
      if (editingExamen) {
        // Actualizar examen
        await axiosClient.put(`/examenes/${editingExamen.id}`, payload);
        alert('Examen actualizado');
      } else {
        // Crear nuevo examen
        await axiosClient.post('/examenes', payload);
        alert('Examen creado');
      }

      setModalVisible(false);
      fetchExamenes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExamen = async (id) => {
    try {
      await axiosClient.delete(`/examenes/${id}`);
      alert('Examen eliminado');
      fetchExamenes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerPreguntas = async (id) => {
    await navigate({ to: `/examenes/${id}/preguntas` });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="containe my-4">
      <h1>Consulta de Exámenes </h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button onClick={() => openModal()} className="btn btn-primary">
          Nuevo Examen
        </button>
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
            {examenes.map((examen) => (
              <tr key={examen.id}>
                <td>{examen.nombre}</td>
                <td>{examen.descripcion}</td>
                <td>{examen.tipo}</td>
                <td>{examen.tipo_licencia}</td>
                <td>
                  <button onClick={() => openModal(examen)} className="btn btn-warning btn-sm me-2">
                    Editar
                  </button>
                  <button onClick={() => deleteExamen(examen.id)} className="btn btn-danger btn-sm me-2">
                    Eliminar
                  </button>
                  <button onClick={() => handleVerPreguntas(examen.id)} className="btn btn-info btn-sm">
                    Ver Preguntas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="modal" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingExamen ? 'Editar Examen' : 'Nuevo Examen'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del Examen</label>
                    <input ref={nombreRef} type="text" className="form-control" id="nombre" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea ref={descRef} className="form-control" id="descripcion" rows="3" required></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duracion" className="form-label">Duración</label>
                    <input ref={duraRef} type="number" className="form-control" id="duracion" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                    <select ref={tipoRef} className="form-control" id="tipo" required>
                      <option value="">Selecciona un tipo</option>
                      <option value="Inicial">Inicial</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Final">Final</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipoLicencia" className="form-label">Categoría</label>
                    <select ref={tipoLicenciaRef} className="form-control" id="tipoLicencia" required>
                      <option value="">Selecciona un tipo</option>
                      <option value="a">Categoria A</option>
                      <option value="b">Categoria B</option>
                      <option value="c">Categoria C</option>
                      <option value="d">Categoria D</option>
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

export default ExamenIndex;
