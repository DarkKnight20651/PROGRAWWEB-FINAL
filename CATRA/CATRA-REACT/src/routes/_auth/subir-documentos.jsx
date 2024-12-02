import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import axiosClient from 'src/axios-client'

import 'src/assets/bootstrap.min.css'

import OpenFileButton from 'src/components/documentos/OpenFileButton'
import DownloadButton from 'src/components/documentos/DownloadButton'
import roleGuard from 'src/util/roleGuard'
import { fallback } from 'src/auth-utils'
import Loader from 'src/components/loader'

export const Route = createFileRoute('/_auth/subir-documentos')({
  component: DocumentUpload,
  beforeLoad: async ({ context }) => {
    roleGuard(context, ["cliente"], fallback);
  },
})

function formatDateToLocal(dateString) {
  const date = new Date(dateString)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)

  return `${day}-${month}-${date.getFullYear()} ${hours}:${minutes}:${seconds}`
}

const fetchDocumentDetails = async (setDocuments, setIsFetching) => {
  let signalError = false;
  try {
    setIsFetching(true);
    const response = await axiosClient.get('/documents/details')
    const { documentos } = response.data

    setDocuments((prev) =>
      prev.map((doc) => {
        if (documentos[doc.tipo]?.subido) {
          return {
            ...doc,
            tipo: doc.tipo,
            status: documentos[doc.tipo].estado,
            updated_at: formatDateToLocal(documentos[doc.tipo].updated_at),
            id: documentos[doc.tipo].id,
            hasUploaded: true,
            comentarios: documentos[doc.tipo].comentarios,
          }
        }

        return {
          ...doc,
        }
      }),
    )
    console.log('Detalles de documentos obtenidos')
  } catch (err) {
    if (err.code === "ERR_CANCELED") signalError = true;
    console.log(err);
  } finally {
    if (!signalError) setIsFetching(false);
  }
}

function DocumentUpload() {
  const [documents, setDocuments] = useState([
    {
      id: null,
      tipo: 'ine',
      fileName: null,
      nombre: 'INE',
      file: null,
      status: 'Sin subir',
      updated_at: null,
      hasUploaded: false,
      comentarios: null,
    },
    {
      id: null,
      tipo: 'comprobante_domicilio',
      fileName: null,
      nombre: 'Comprobante de domicilio',
      file: null,
      status: 'Sin subir',
      updated_at: null,
      hasUploaded: false,
      comentarios: null,
    },
    {
      id: null,
      tipo: 'acta_nacimiento',
      fileName: null,
      nombre: 'Acta de nacimiento',
      file: null,
      status: 'Sin subir',
      updated_at: null,
      hasUploaded: false,
      comentarios: null,
    },
    {
      id: null,
      tipo: 'curp',
      fileName: null,
      nombre: 'CURP',
      file: null,
      status: 'Sin subir',
      updated_at: null,
      hasUploaded: false,
      comentarios: null,
    },
  ])

  const [isUploading, setIsUploading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [validationState, setValidationState] = useState({
    hasErrors: false,
    errors: {},
  });

  useEffect(() => {
    ; (async () => await fetchDocumentDetails(setDocuments, setIsFetching))()
  }, [])

  const handleFileChange = useCallback((e, tipo) => {
    const file = e.target.files[0]
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.tipo === tipo ? { ...doc, file, fileName: file.name } : doc,
      ),
    )
  }, [])

  const handleUpload = async () => {
    const formData = new FormData()

    let hasFiles = true
    documents.forEach((doc) => {
      if (doc.file && doc.status !== 'aprobado') {
        formData.append(doc.tipo, doc.file)
      }
      if (
        !doc.file &&
        (doc.status === 'Sin subir' || doc.status === 'rechazado')
      ) {
        hasFiles = false
      }
    })

    if (!hasFiles) {
      alert('Por favor selecciona todos los archivos sin subir y/o rechazados.')
      return
    }

    /* if (reupload) {
      alert("No has seleccionado ningún archivo");
      return;
    } */

    setIsUploading(true)
    try {
      const { status } = await axiosClient.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setValidationState({
        hasErrors: false,
        errors: {},
      })

      if (status == 204) alert('No se subió ningún archivo')
      else alert('Documentos subidos con éxito')
    } catch (error) {
      console.log(
        'Error al subir los documentos:',
        error.response?.data?.errors,
      )
      setValidationState({
        hasErrors: true,
        errors: error.response?.data?.errors,
      })
    } finally {
      setIsUploading(false);
      (async () => await fetchDocumentDetails(setDocuments, setIsFetching))()
    }
  }

  const isLoading = isFetching || isUploading

  if (isFetching) {
    return <Loader />
  } else
    return (
      <div>
        <h2>Subir Documentos</h2>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <fieldset disabled={isLoading}>
            {documents.map((doc) => (
              <div
                key={doc.tipo}
                style={{ marginBottom: '20px' }}
                className="mb-3"
              >
                {!doc.hasUploaded ? (
                  <div style={{ marginBottom: '15px' }}>
                    <label className="form-label">{doc.nombre}</label>
                    <input
                      className="form-control"
                      type="file"
                      accept=".pdf, .png, .jpg, .jpeg, .webp"
                      onChange={(e) => handleFileChange(e, doc.tipo)}
                    />
                    <br />
                  </div>
                ) : doc.hasUploaded && doc.status === 'pendiente' ? (
                  <div style={{ marginBottom: '15px' }}>
                    <p>
                      <strong>{doc.nombre}</strong>
                    </p>
                    El documento {doc.nombre} ha sido subido y registrado
                    correctamente, pero puedes actualizar tu archivo.
                    <br />
                    <label
                      htmlFor={doc.tipo}
                      className="btn btn-info"
                      style={{ marginTop: '6px' }}
                    >
                      {doc.fileName ?? 'Subir un nuevo archivo'}
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id={doc.tipo}
                      accept=".pdf, .png, .jpg, .jpeg, .webp"
                      onChange={(e) => handleFileChange(e, doc.tipo)}
                      style={{ display: 'none' }}
                    />
                    <br />
                  </div>
                ) : doc.hasUploaded && doc.status === 'rechazado' ? (
                  <div style={{ marginBottom: '15px' }}>
                    <label className="form-label">{doc.nombre}</label>
                    <p>Tu documento ha sido rechazado por el administrador.</p>
                    <p>Por favor sube de nuevo tu archivo</p>
                    <input
                      className="form-control"
                      type="file"
                      accept=".pdf, .png, .jpg, .jpeg, .webp"
                      onChange={(e) => handleFileChange(e, doc.tipo)}
                    />{' '}
                    <br />
                    {doc.comentarios ? (
                      <div className="form-group">
                        <label htmlFor={`${doc.tipo}-comentarios`}>
                          Comentarios
                        </label>
                        <textarea
                          id={`${doc.tipo}-comentarios`}
                          className="form-control"
                          rows="3"
                          defaultValue={doc.comentarios}
                          disabled
                        ></textarea>
                        <br />
                        <p>Por favor selecciona un archivo nuevo</p>
                      </div>
                    ) : (
                      <p>
                        No se proporcionaron comentarios sobre el rechazo del
                        documento
                      </p>
                    )}
                  </div>
                ) : (
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '19px' }}>
                      <strong>{doc.nombre}</strong>
                    </p>
                    Tu documento ha sido aprobado.
                  </div>
                )}

                <p>
                  Estado del documento:{' '}
                  <span
                    style={{
                      color:
                        doc.status === 'aprobado'
                          ? '#0F0'
                          : doc.status === 'rechazado'
                            ? '#F00'
                            : doc.status === 'pendiente'
                              ? '#00F'
                              : '#000',
                    }}
                  >
                    {doc.status.toUpperCase()}
                  </span>
                </p>
                {doc.id && doc.status !== 'Sin subir' && (
                  <div>
                    <OpenFileButton documentId={doc.id} />
                    <DownloadButton documentId={doc.id} tipo={doc.tipo} />
                  </div>
                )}

                {validationState.hasErrors &&
                  validationState?.errors?.[doc.tipo] && (
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
                backgroundColor: isLoading ? '#ccc' : '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              Subir Documentos
            </button>
          </fieldset>
        </form>
      </div>
    )
}
