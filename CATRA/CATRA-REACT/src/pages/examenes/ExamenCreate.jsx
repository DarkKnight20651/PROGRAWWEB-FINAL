import { createRef } from 'react';
import axiosClient from "/src/axios-client.jsx";
import { useNavigate } from '@tanstack/react-router';

const ExamenCreate = () => {
  const navigate = useNavigate();

  const nombreRef = createRef();
  const descRef = createRef();
  const tipoRef = createRef();
  const tipoLicencia = createRef();
  const duraRef = createRef();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const payload = {
      nombre: nombreRef.current.value,
      descripcion: descRef.current.value,
      tipo: tipoRef.current.value,
      tipo_licencia: tipoLicencia.current.value,
      duracion: duraRef.current.value,
    };

    try {
      await axiosClient.post('/examenes', payload);
      console.log("Examen creado");
      await navigate({ to: "/examenes" });
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
            ref={tipoLicencia}
            className="form-control"
            id="tipo_licencia"
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="a">Categoria A</option>
            <option value="b">Categoria B</option>
            <option value="c">Categoria C</option>
            <option value="d">Categoria D</option>
            <option value="e">Categoria E</option>
            <option value="f">Categoria F</option>
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
}
export default ExamenCreate;