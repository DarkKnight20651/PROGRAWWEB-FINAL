import axiosClient from 'src/axios-client';

const handleDownload = async (documentId, tipo) => {
  try {
    const response = await axiosClient.get(`/documents/show/${documentId}?download=true`, {
      responseType: 'blob',
    });

    const contentDisposition = response.headers['content-disposition'];
    const fileNameMatch = contentDisposition && contentDisposition.match(/filename="?(.+)"?/);
    const fileName = fileNameMatch ? fileNameMatch[1] : `documento-${tipo}`;

    const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }));

    const link = document.createElement('a');
    link.href = fileURL;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(fileURL);
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    alert('No se pudo descargar el archivo.');
  }
};

// eslint-disable-next-line react/prop-types
const DownloadButton = ({ documentId, tipo }) => {

  return <button onClick={(e) => { e.preventDefault(); handleDownload(documentId, tipo) }}
    className='btn btn-outline-primary ms-2'>
    Descargar Documento
  </button>;
};

export default DownloadButton;
