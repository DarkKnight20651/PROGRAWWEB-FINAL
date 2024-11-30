import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import axiosClient from 'src/axios-client';
import DownloadButton from 'src/components/documentos/DownloadButton';
import OpenFileButton from 'src/components/documentos/OpenFileButton';
import Loader from 'src/components/loader';

export const Route = createFileRoute('/_auth/validar-documentos/$userId')({
  component: DocumentoRevision,
})

async function fetchDocuments(userId, setDocuments, setIsLoading, setError) {
  setIsLoading(true);
  try {
    const response = await axiosClient.get(`/documents/details/${userId}`);
    setDocuments(response.data.documentos);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setError('Error al cargar los documentos');
    setIsLoading(false);
  }
};

function formatDateToLocal(dateString) {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${day}-${month}-${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

function DocumentoRevision() {
  const { userId } = Route.useParams();
  const [documents, setDocuments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments(userId, setDocuments, setIsLoading, setError);
  }, [userId]);

  const handleStatusChange = (tipo, field, value) => {
    setDocuments((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = Object.keys(documents).reduce((acc, tipo) => {
        if (documents[tipo].subido) {
          acc[tipo] = {
            estado: documents[tipo]?.estado || 'pendiente',
            comentarios: documents[tipo]?.comentarios || '',
          };
        }
        return acc;
      }, {});

      await axiosClient.post(`/users/documents-status/${userId}`, payload);
      alert('Estados actualizados con éxito');
    } catch (err) {
      console.log(err);
      alert('Error al actualizar los estados');
    } finally {
      fetchDocuments(userId, setDocuments, setIsLoading, setError);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  const hasUploadedDocuments = Object.values(documents).some(
    (doc) => doc.subido
  );

  return (
    <form onSubmit={handleSubmit} className="container" style={{ marginTop: '0px' }}>
      {Object.keys(documents).map((tipo) => (
        <div key={tipo} className="mb-4 p-3 border rounded shadow-sm bg-light">
          <h3 className="text-primary text-uppercase">{tipo.replace('_', ' ')}</h3>
          {documents[tipo].subido ? (
            <>
              <div className="mb-3">
                <OpenFileButton documentId={documents[tipo].id} />
                <DownloadButton documentId={documents[tipo].id} tipo={tipo} />
              </div>
              <p className="text-muted">
                Última actualización: {formatDateToLocal(documents[tipo].updated_at)}
              </p>
              <p>
                <strong>Estado actual:</strong> {documents[tipo].estado}
              </p>
              <div className="mb-3">
                <label className="form-label">
                  Cambiar estado:
                  <select
                    value={documents[tipo]?.estado || 'pendiente'}
                    onChange={(e) =>
                      handleStatusChange(tipo, 'estado', e.target.value)
                    }
                    className="form-select"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobado">Aprobado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </label>
              </div>
              <div className="w-100">
                <label className="form-label">
                  Comentarios:
                  <textarea
                    value={documents[tipo]?.comentarios || ''}
                    onChange={(e) =>
                      handleStatusChange(tipo, 'comentarios', e.target.value)
                    }
                    className="form-control"
                    rows="5" style={{ width: '350px' }}
                  ></textarea>
                </label>
              </div>
            </>
          ) : (
            <p className="text-danger">Documento no subido</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={!hasUploadedDocuments}
        className={`btn btn-lg w-100 ${hasUploadedDocuments ? 'btn-primary' : 'btn-secondary disabled'}`}
      >
        Actualizar Estados
      </button>
    </form>
  );
}