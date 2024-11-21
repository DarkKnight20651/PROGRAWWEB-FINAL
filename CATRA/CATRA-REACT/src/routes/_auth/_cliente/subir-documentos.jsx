import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from "react";
import axiosClient from "src/axios-client";

import 'src/assets/bootstrap.min.css'

export const Route = createFileRoute('/_auth/_cliente/subir-documentos')({
  component: DocumentUpload,
})

function formatDateToLocal(dateString) {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2); 
  const month = ("0" + (date.getMonth() + 1)).slice(-2); 
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${day}-${month}-${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

const handleOpenDocument = (documentId) => {
  window.open(`/api/documents/${documentId}`, '_blank');
};

const fetchDocumentDetails = async (setDocuments, setIsFetching) => {
  try {
    setIsFetching(true);
    const response = await axiosClient.get("/documents/details");
    const { documentos } = response.data;

    setDocuments((prev) =>
      prev.map(doc => {

        if(documentos[doc.tipo]?.subido) {
          return {
            ...doc,
            tipo: doc.tipo,
            status: documentos[doc.tipo].estado,
            updated_at: formatDateToLocal(documentos[doc.tipo].updated_at),
            id: documentos[doc.tipo].id
          }
        }

        return {
          ...doc,
        }

      })
    );
    console.log("Detalles de documentos obtenidos");

  } catch (error) {
    console.log("Error al obtener los detalles de los documentos:", error);
  } finally {
    setIsFetching(false);
  }
};

function DocumentUpload() {
  const [documents, setDocuments] = useState([
    { id: null, tipo: 'ine', file: null, status: 'Sin subir', updated_at: null },
    { id: null, tipo: 'comprobante_domicilio', file: null, status: 'Sin subir', updated_at: null },
    { id: null, tipo: 'acta_nacimiento', file: null, status: 'Sin subir', updated_at: null },
    { id: null, tipo: 'curp', file: null, status: 'Sin subir', updated_at: null }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [validationState, setValidationState] = useState({
    hasErrors: false,
    errors: {}
  });

  useEffect(() => {
    (async () => await fetchDocumentDetails(setDocuments, setIsFetching))();
  }, []);

  const handleFileChange = useCallback((e, tipo) => {
    const file = e.target.files[0];
    setDocuments(prevDocuments =>
      prevDocuments.map(doc =>
        doc.tipo === tipo ? { ...doc, file } : doc
      )
    );
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();

    let hasFiles = true;
    documents.forEach(doc => {
      if (doc.file && doc.status !== 'aprobado') {
        formData.append(doc.tipo, doc.file);
      } else if (!doc.file || doc.status === 'Sin subir' || doc.status === 'rechazado') {
        hasFiles = false;
      }
    });

    /*if (!hasFiles) {
      alert("Por favor sube todos los archivos sin subir o rechazados.");
      return;
    }*/

    setIsUploading(true);
    try {
      await axiosClient.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setValidationState({
        hasErrors: false,
        errors: {}
      });

      alert("Documentos subidos con éxito.");
    } catch (error) {

      console.log("Error al subir los documentos:", error.response?.data?.errors);

      setValidationState({
        hasErrors: true,
        errors: error.response?.data?.errors
      });

    } finally {
      setIsUploading(false);
      (async () => await fetchDocumentDetails(setDocuments, setIsFetching))();
    }
  };

  const isLoading = isFetching || isUploading;

  return (
    <div>
      <h2>Subir Documentos</h2>
      {isLoading && <p>Cargando información ...</p>}
      <form>
        <fieldset disabled={isLoading}>
          {documents.map((doc) => (
            <div key={doc.tipo} style={{ marginBottom: "20px" }}>
              <div style={{marginBottom: '15px'}}>
                <label>
                  {doc.tipo.toUpperCase()}:
                  <input
                    type="file"
                    accept=".pdf, .png, .jpg, .jpeg, .webp"
                    onChange={(e) => handleFileChange(e, doc.tipo)}
                  />
                </label>
              </div>
              
              <p>
                Estado del documento: <span
                  style={{color: doc.status === 'aprobado' ? '#0F0' : 
                    doc.status === 'rechazado' ? '#F00' : 
                    doc.status === 'pendiente' ? '#00F' : '#000'
                  }}
                >{doc.status}</span>
              </p>
              {doc.status !== "Sin subir" && (
                <div>
                  <p>Documento subido el: {doc.updated_at}</p>
                  <p><button onClick={() => handleOpenDocument(doc.id)}>Abrir documento</button></p>
                </div>
              )}

              {validationState.hasErrors && validationState.errors[doc.tipo] && (
                <ul className="list-unstyled">
                  {validationState.errors[doc.tipo].map((error, index) => (
                    <li key={index} className="text-danger">
                      {error}
                    </li>
                  ))}
                </ul>
              )}

            <hr />
            </div>
          ))}
          <br />
          <button
            type="button"
            onClick={handleUpload}
            style={{
              backgroundColor: isLoading ? "#ccc" : "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            Subir Documentos
          </button>
        </fieldset>
      </form>
    </div>
  );
}
