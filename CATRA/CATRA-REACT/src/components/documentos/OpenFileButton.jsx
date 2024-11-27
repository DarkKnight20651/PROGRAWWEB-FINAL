import axiosClient from 'src/axios-client';

const handleDownload = async (documentId) => {
    try {
        const response = await axiosClient.get(`/documents/show/${documentId}`, {
            responseType: 'blob',
        });
        const fileType = response.headers['content-type'];
        const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: fileType }));

        const newWindow = window.open(fileURL, '_blank');
        if (newWindow) {
            newWindow.focus();
        } else {
            alert('Por favor, habilita abrir pestañas en tu navegador para esta acción.');
        }
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        alert('No se pudo mostrar el archivo.');
    }
};

// eslint-disable-next-line react/prop-types
const OpenFileButton = ({ documentId }) => {

    return <button onClick={(e) => {
        e.preventDefault();
        handleDownload(documentId)
    }}
        className='btn btn-outline-primary'>Ver Documento</button>;
};

export default OpenFileButton;
