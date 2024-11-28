import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import logo from "/src/assets/logo.png";
import "./Cursos.css";

const ListaDistribucion = () => {
  const [distribucion, setDistribucion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);  // Estado para controlar la visibilidad del modal
  const [modalDescription, setModalDescription] = useState("");  // Estado para la descripción del modal
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchInscriptionsWithDocuments = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/inscriptions");
        if (!response.ok) {
          throw new Error("No se pudo obtener las inscripciones");
        }
        const data = await response.json();

        const distribucionConDocumentos = await Promise.all(
          data.map(async (persona) => {
            const documentos = await fetchUserDocuments(persona.id);
            return { ...persona, documents: documentos };
          })
        );

        setDistribucion(distribucionConDocumentos);
      } catch (error) {
        console.error("Error al obtener las inscripciones:", error);
      }
    };

    fetchInscriptionsWithDocuments();
  }, []);

  const fetchUserDocuments = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }), // Enviar el userId en el body de la solicitud
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener los documentos");
      }
  
      const data = await response.json();
      return data.documentos;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  

  // Lógica de paginación
  const totalPages = Math.ceil(distribucion.length / rowsPerPage);
  const paginatedData = distribucion.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Lógica para abrir y cerrar el modal
  const openModal = (categoria) => {
    let description = "";

    // Descripción basada en la categoría
    switch (categoria) {
      case "A":
        description = "Pasaje y Turismo";
        break;
      case "B":
        description = "Carga General";
        break;
      case "C":
        description = "Torton y Rabon";
        break;
        case "D":
          description = "Chofer Guia";
          break;
        case "E":
          description = "TSR-TSS Doblemente articulado o Materiales y residuos peligrosos";
          break;
          case "F":
        description = "Aeropuertos y puertos maritimos";
        break;
      default:
        description = "Descripción no disponible.";
        break;
    }

    setModalDescription(description);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  
  return (
    <div className="App gradient__bg">
      <div className="custom-container">
        <div>
          <table className="table table-bordered border-primary border border-black align-middle">
            <thead>
              <tr>
                <th scope="col">
                  <img src={logo} width="100" height="100" alt="logo" />
                </th>
                <th scope="col" style={{ fontSize: "30px" }}>Lista de Distribución</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th scope="row" colSpan="2">LUGAR</th>
              </tr>
              <tr>
                <th scope="row" colSpan="2">FECHA</th>
              </tr>
              <tr>
                <th scope="row" colSpan="2">REVISIÓN</th>
              </tr>
            </tbody>
          </table>

          <div className="table-responsive">
            <table className="table table-bordered border-primary border border-black align-middle">
              <thead className="align-middle">
                <tr>
                  <th scope="col" className="Horizontal-text">No</th>
                  <th scope="col" className="Horizontal-text">Nombre</th>
                  <th scope="col" className="Horizontal-text">Categoría</th>
                  <th scope="col" className="vertical-text">INE</th>
                  <th scope="col" className="vertical-text">Comprobante de Domicilio</th>
                  <th scope="col" className="vertical-text">Acta de Nacimiento</th>
                  <th scope="col" className="vertical-text">CURP</th>
                  <th scope="col" className="Horizontal-text">Responsable</th>
                  <th scope="col" className="Horizontal-text">Observaciones</th>
                  <th scope="col" className="Horizontal-text">Firma</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {paginatedData.map((persona, index) => (
                    
                  <tr key={persona.id}>
                    <th scope="row">{(currentPage - 1) * rowsPerPage + index + 1}</th>
                    <td>{persona.nombre || "No disponible"}</td>
                    <td>
                      {persona.category}
                      <button
                        className="btn btn-info btn-sm ms-2"
                        onClick={() => openModal(persona.category)}
                      >
                        ?
                      </button>
                    </td>
                    {["ine", "comprobante_domicilio", "acta_nacimiento", "curp"].map((docTipo) => (
                      <td key={docTipo} style={{ textAlign: "center", fontSize: "18px" }}>
                        {persona.documents?.[docTipo]?.estado === "aprobado" ? "✔️" : "❌"}
                      </td>
                    ))}
                    <td>
                      {/* Cambié el input por un select con la opción "YURICO" */}
                      <select className="form-select" defaultValue="YURICO">
                        <option value="YURICO">YURICO</option>
                      </select>
                    </td>
                    <td>
                      <input type="text" className="form-control" placeholder="Escribe observaciones" />
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación */}
          <div className="pagination">
            <button
              className="btn btn-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn ${currentPage === i + 1 ? "btn-secondary" : "btn-light"}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Modal de descripción */}
      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h4>Descripción de la Categoría</h4>
            <p>{modalDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaDistribucion;
