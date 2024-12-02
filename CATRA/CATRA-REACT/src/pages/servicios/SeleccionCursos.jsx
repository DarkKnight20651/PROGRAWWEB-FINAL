import React, { useState } from 'react';
import '../../styles/index.css';
import '../../assets/bootstrap.min.css';
import './Cursos.css';
import useAuth from 'src/useAuth';  // Importar el hook useAuth

const SeleccionCursos = () => {
  const [cursoLetra, setCursoLetra] = useState('');
  const [isSelected, setIsSelected] = useState(null);
  const [alcance, setAlcance] = useState('');
  const { user } = useAuth();  // Obtener los datos del usuario autenticado

  const handleRadioChange = (event) => {
    setIsSelected(event.target.value);
  };

  const handleCursoChange = (event) => {
    setCursoLetra(event.target.value);
  };

  const handleAlcanceChange = (event) => {
    setAlcance(event.target.value);
  };

  const handleSubmit = async () => {
    const userId = user ? user.id : null;
    const category = cursoLetra;
    const tipo = isSelected === 'yes' ? 'Renovacion' : 'Obtencion';

    if (!category) {
      alert('Por favor, selecciona un tipo de curso.');
      return;
    }

    if (!userId) {
      alert('No se encontró el ID del usuario.');
      return;
    }

    if (!alcance) {
      alert('Por favor, selecciona el alcance del curso.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/inscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          category: category,
          tipo: tipo,
          alcance: alcance,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.message);  // Mostramos el mensaje de error (ej. "Ya estás inscrito en este curso.")
        return;
      }

      const result = await response.json();
      alert('Inscripción realizada con éxito: ' + result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al enviar la inscripción.');
    }
  };

  return (
    <div className="App gradient__bg">
      <div className="container mt-4">
        <h1>Solicitud Curso</h1>

        {/* Lista desplegable para seleccionar el tipo de curso */}
        <div className="mb-4">
          <label htmlFor="cursoSelect">Selecciona un tipo de curso:</label>
          <select
            id="cursoSelect"
            className="form-control"
            value={cursoLetra}
            onChange={handleCursoChange}
          >
            <option value="">--Selecciona--</option>
            <option value="A">Curso Tipo A</option>
            <option value="B">Curso Tipo B</option>
            <option value="C">Curso Tipo C</option>
            <option value="D">Curso Tipo D</option>
            <option value="E">Curso Tipo E</option>
            <option value="F">Curso Tipo F</option>
          </select>
        </div>

        <h2>Cuentas ya con una licencia {cursoLetra}?</h2>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="yes"
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Sí
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="no"
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>

        {/* Agregar espacio entre las preguntas */}
        <div className="mt-4">
          <h2>Alcance</h2>
        </div>

        {/* Agregar el input para nacional o internacional */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="alcance"
            id="nacional"
            value="Nacional"
            onChange={handleAlcanceChange}
          />
          <label className="form-check-label" htmlFor="nacional">
            Nacional
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="alcance"
            id="internacional"
            value="Internacional"
            onChange={handleAlcanceChange}
          />
          <label className="form-check-label" htmlFor="internacional">
            Internacional
          </label>
        </div>

        <div className="container mt-4 mb-2">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Solicitar Curso
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeleccionCursos;
