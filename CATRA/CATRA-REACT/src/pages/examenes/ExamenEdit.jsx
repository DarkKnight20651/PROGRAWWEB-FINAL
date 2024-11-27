import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import axiosClient from 'src/axios-client.jsx';

const ExamenEdit = () => {
  const { examenId } = useParams({ strict: false });
  const navigate = useNavigate();
  const nombreRef = useRef();
  const descRef = useRef();
  const tipoRef = useRef();
  const tipo_licenciaRef = useRef();
  const duraRef = useRef();

  useEffect(() => {
    axiosClient.get(`/examenes/${examenId}`)
      .then(({ data }) => {
        duraRef.current.value = data.duracion;
        nombreRef.current.value = data.nombre;
        descRef.current.value = data.descripcion;
        tipoRef.current.value = data.tipo;
        tipo_licenciaRef.current.value = data.tipo_licencia;
      })
      .catch((error) => console.error('Error al cargar Examen:', error));
  }, [examenId]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const payload = {
      duracion: duraRef.current.value,
      nombre: nombreRef.current.value,
      descripcion: descRef.current.value,
      tipo: tipoRef.current.value,
      tipo_licencia: tipo_licenciaRef.current.value,
    };

    try {
      await axiosClient.put(`/examenes/${examenId}`, payload);
      alert("Examen editado");
      await navigate({ to: '/examenes' });
    } catch (error) {
      console.log(error);
    }
  };
  const cancelar = async () => {
    await navigate({ to: "/examenes" });
  }
  return (

    <div className="container">
      <h1 className="titulo" id="titulo">Crear nuevo examen</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del Examen</label>
          <input
            ref={nombreRef}
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Nombre del examen"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            ref={descRef}
            className="form-control"
            id="descripcion"
            placeholder="Descripción del examen"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Duración del examen</label>
          <input
            ref={duraRef}
            className="form-control"
            id="descripcion"
            placeholder="Duracion del examen (en minutos)"
            rows="3"
            type="number"
            required
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo de Examen</label>
          <select
            ref={tipoRef}
            className="form-control"
            id="tipo"
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="inicial">Inicial</option>
            <option value="intermedio">Intermedio</option>
            <option value="final">Final</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="idcurso" className="form-label">Categoria del curso</label>
          <select
            ref={tipo_licenciaRef}
            className="form-control"
            id="tipo"
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="a">Categoria A</option>
            <option value="b">Categoria B</option>
            <option value="c">Categoria C</option>
            <option value="d">Categoria D</option>
            <option value="e">Categoria E</option>
            <option value="f">Categoria F</option>F
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '10px 60px', fontSize: '25px' }}
          >
            Crear
          </button>
          <button
            type="button"
            onClick={cancelar}
            className="btn btn-secondary"
            style={{ padding: '10px 20px', fontSize: '25px', marginLeft: '10px' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamenEdit;