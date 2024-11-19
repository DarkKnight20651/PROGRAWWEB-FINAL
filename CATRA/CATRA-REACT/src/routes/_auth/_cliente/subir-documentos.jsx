import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from "react";
import axiosClient from "src/axios-client";

import 'src/assets/bootstrap.min.css'

export const Route = createFileRoute('/_auth/_cliente/subir-documentos')({
  component: DocumentUpload,
})

function DocumentUpload() {
  const [documents, setDocuments] = useState({
    ine: { file: null, status: "No subido", loading: false },
    comprobante_domicilio: { file: null, status: "No subido", loading: false },
    curp: { file: null, status: "No subido", loading: false },
  });

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const response = await axiosClient.get("/documents/details");
        const { documentos } = response.data;

        setDocuments((prev) =>
          Object.keys(prev).reduce((acc, tipo) => {
            acc[tipo] = {
              ...prev[tipo],
              status: documentos[tipo].subido
                ? `Estado: ${documentos[tipo].estado}`
                : "No subido",
            };
            return acc;
          }, {})
        );
      } catch (error) {
        console.log("Error al obtener los detalles de los documentos:", error);
      }
    };

    fetchDocumentDetails();
  }, []);

  const handleFileChange = (e, tipo) => {
    const file = e.target.files[0];
    setDocuments((prev) => ({
      ...prev,
      [tipo]: { ...prev[tipo], file },
    }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    let hasFiles = false;

    Object.keys(documents).forEach((tipo) => {
      if (documents[tipo].file) {
        formData.append(tipo, documents[tipo].file);
        setDocuments((prev) => ({
          ...prev,
          [tipo]: { ...prev[tipo], loading: true },
        }));
        hasFiles = true;
      }
    });

    if (!hasFiles) {
      alert("Por favor selecciona al menos un archivo para subir.");
      return;
    }

    setLoadingState(true);

    try {
      await axiosClient.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Documentos subidos con éxito.");
      setDocuments((prev) =>
        Object.keys(prev).reduce((acc, tipo) => {
          acc[tipo] = { ...prev[tipo], loading: false, status: "Pendiente" };
          return acc;
        }, {})
      );
    } catch (error) {
      console.log("Error al subir los documentos:", error);
      alert("Ocurrió un error al subir los documentos.");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div>
      <h2>Subir Documentos</h2>
      <form>
        {Object.keys(documents).map((tipo) => (
          <div key={tipo} style={{ marginBottom: "20px" }}>
            <label>
              {tipo.toUpperCase()}:
              <input
                type="file"
                accept=".pdf"
                disabled={documents[tipo].loading || loadingState}
                onChange={(e) => handleFileChange(e, tipo)}
              />
            </label>
            <p>
              {documents[tipo].loading
                ? "Cargando..."
                : documents[tipo].status}
            </p>
          </div>
        ))}
      </form>
      <button
        type="button"
        onClick={handleUpload}
        disabled={loadingState}
        style={{
          backgroundColor: loadingState ? "#ccc" : "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: loadingState ? "not-allowed" : "pointer",
        }}
      >
        Subir Documentos
      </button>
    </div>
  );
};