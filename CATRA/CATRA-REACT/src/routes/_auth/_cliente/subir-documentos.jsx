import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from "react";
import axiosClient from "src/axios-client";

import 'src/assets/bootstrap.min.css'

export const Route = createFileRoute('/_auth/_cliente/subir-documentos')({
  component: DocumentUpload,
})

const fetchDocumentDetails = async (setDocuments, setIsFetching) => {
  try {
    setIsFetching(true);
    const response = await axiosClient.get("/documents/details");
    const { documentos } = response.data;

    setDocuments((prev) =>
      prev.map(doc => ({
        ...doc,
        status: documentos[doc.tipo]?.subido
          ? `Estado: ${documentos[doc.tipo].estado}`
          : 'Sin subir'
      }))
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
    { tipo: 'ine', file: null, status: 'Sin subir' },
    { tipo: 'comprobante_domicilio', file: null, status: 'Sin subir' },
    { tipo: 'acta_nacimiento', file: null, status: 'Sin subir' },
    { tipo: 'curp', file: null, status: 'Sin subir' }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

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
      } else if (doc.status === 'Sin subir' || doc.status === 'rechazado') {
        hasFiles = false;
      }
    });

    if (!hasFiles) {
      alert("Por favor sube todos los archivos.");
      return;
    }

    setIsUploading(true);
    try {
      await axiosClient.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Documentos subidos con éxito.");
    } catch (error) {
      console.log("Error al subir los documentos:", error);
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
              <label>
                {doc.tipo.toUpperCase()}:
                <input
                  type="file"
                  accept=".pdf, .png, .jpg, .jpeg, .webp"
                  onChange={(e) => handleFileChange(e, doc.tipo)}
                />
              </label>
              <p>
                {doc.status}
              </p>
            </div>
          ))}
          <br />
          <button
            type="button"
            onClick={handleUpload}
            style={{
              backgroundColor: isUploading ? "#ccc" : "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: isUploading ? "not-allowed" : "pointer",
            }}
          >
            Subir Documentos
          </button>
        </fieldset>
      </form>
    </div>
  );
}
